const {Recruit} = require('../models');

const findRecruit = async (id) =>{
    const recruit = await Recruit.findOne({
        where: {
            recruit_id:id
        }
    });
    if(!recruit){
        return true;
    }
    else {
        return false;
    }
}

const postNewRecruit = async (req,res,next)=>{
    // 채용공고 등록
    console.log('채용공고 등록');
    const newRecruit = await Recruit.create({
        company_id:req.body.company_id,
        position:req.body.position,
        reward: req.body.reward,
        skill:req.body.skill,
        content:req.body.content,
    });
    res.status(200).json({newRecruit});
}

const postUpdateRecruit = async (req,res,next)=>{
    // 채용공고 수정
    if(findRecruit(req.body.recruit_id)){
        return res.status(500).json({message : `채용공고 정보를 확인해 주세요`});
    }
    await Recruit.update({
        position:req.body.position,
        reward: req.body.reward,
        skill:req.body.skill,
        content:req.body.content,
    },{
        where:{
            recruit_id:req.body.recruit_id
        }
    });
    let change = await Recruit.findOne({
        where: {
            recruit_id:req.body.recruit_id
        }
    });
    res.status(200).json({change});
    console.log('채용공고 수정');
};

const postDeleteRecruit = async (req,res,next) => {
    // 채용공고 삭제
    if(findRecruit(req.body.recruit_id)){
        return res.status(500).json({message : `채용공고 정보를 확인해 주세요`});
    }
    await Recruit.destroy({
        where: {
            recruit_id:req.body.recruit_id
        }
    })
    console.log('채용공고 삭제');
    res.status(200).json({message : `deleted ${req.body.recruit_id} `});
}

module.exports = {
    postDeleteRecruit,
    postNewRecruit,
    postUpdateRecruit
}