const express = require('express');
const router = express.Router();
const {Recruit, Company} = require('../models')


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

const addAnotherRecruit = async (array) => {
    let allRecruitId = await Recruit.findAll({attributes: ['recruit_id']},{
        where: {
            company_id : array.dataValues.company_id
            }
        });
    console.log("allRecruitId",allRecruitId);

    let ids = []
    for (const item of allRecruitId) {   
        ids.push(item.dataValues.recruit_id)    
    }

    array.dataValues['another_recruit'] = ids;
    
    return array;
}


router.get('/all',async (req,res,next)=>{
    // 모든 채용공고 조회
    let allRecruit = await Recruit.findAll({attributes: ['recruit_id','position','reward','skill','company_id']})
    .catch((err) => {
        return next(err);
    });
    allRecruit = await addCompanyInfoAll(allRecruit)
    console.log(allRecruit)
    res.status(200).json({allRecruit});
});



router.get('/:id/detail',async (req,res,next)=>{
    // 채용공고 상세보기
    
    let theRecruit = await Recruit.findOne(
        { where: {
            recruit_id : req.params.id
            }
        })
    .catch((err) => {
        return next(err);
    });
    if(!theRecruit){
        return res.status(500).json({message:"채용공고 정보를 확인해주세요"});
    }

    // 회사정보추가 
    theRecruit = await addCompanyInfo(theRecruit);

     // 회사의 다른 채용공고 추가
    theRecruit = await addAnotherRecruit(theRecruit);

    res.status(200).json({theRecruit});

});


module.exports = router;