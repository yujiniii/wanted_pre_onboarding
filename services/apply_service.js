const {Recruit, Company, User} = require('../models')
const find = require('./recruit_service')

const addCompanyInfo = async (item)=>{
    let companyInfo = await Company.findOne({
        where: {
            company_id : item.company_id
            }
        });
    item.dataValues['company_name'] = await companyInfo.dataValues.company_name;
    item.dataValues['country'] = await companyInfo.dataValues.country;
    item.dataValues['city'] = await companyInfo.dataValues.city;

    return item;
}

const addCompanyInfoAll = async (array) => {
       for (const item of array) {   
            await addCompanyInfo(item);
        }
    return array;
}

const addAnotherRecruit = async (id) => {
    let allRecruitId = await Recruit.findAll({},{
        where: {
            company_id : id
            }
        });
    console.log("allRecruitId",allRecruitId);

    let ids = []
    for (const item of allRecruitId) {  
        if(item.dataValues.company_id == id) {
            ids.push(item.dataValues.recruit_id);
        }
    }

    return ids;
}



const getAllRecruit = async (req,res,next)=>{
    // 모든 채용공고 조회
    let allRecruit = await Recruit.findAll({attributes: ['recruit_id','position','reward','skill','company_id']})
    .catch((err) => {
        return next(err);
    });
    allRecruit = await addCompanyInfoAll(allRecruit)
    console.log(allRecruit)
    res.status(200).json({allRecruit});
}

const getRecruitDetail = async (req,res,next)=>{
    // 채용공고 상세보기
    let theRecruit = find.findRecruit(req.params.id);
    if(theRecruit){
        return res.status(500).json({message:"채용공고 정보를 확인해주세요"});
    }
    // 회사정보추가 
    theRecruit = await addCompanyInfo(theRecruit);

     // 회사의 다른 채용공고 추가
    let ids = await addAnotherRecruit(theRecruit.dataValues.company_id);
    theRecruit.dataValues['another_recruit'] = ids;

    res.status(200).json({theRecruit});

}

const postApplyLetsGo = async (req,res,next)=>{
    // 입사지원
    let theRecruit = await find.findRecruit(req.params.id);
    if(theRecruit){
        return res.status(500).json({message:"채용공고 정보를 확인해주세요"});
    }
    let isApplied = await User.findOne({
       where: { 
        user_id : req.body.user_id 
    }
});

    if(!isApplied){
        return res.status(500).json({message:"사용자 정보를 확인해주세요"});
    }

    isApplied = isApplied.dataValues.is_applied
    if(!isApplied){
        await User.update({
            recruit_id:req.params.id,
            is_applied:true
        },{
            where:{
                user_id:req.body.user_id
            }
        });
        return res.json({message:"당신의 도전을 응원합니다."})
    } else {
        return res.status(500).json({message:"입사 지원은 한번만 가능합니다."})
    }
    
}

module.exports = {
    getAllRecruit,
    getRecruitDetail,
    postApplyLetsGo
}