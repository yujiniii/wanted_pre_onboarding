const express = require('express');
const router = express.Router();
const Recruit = require('../models')


router.post('/new', async (req,res,next)=>{
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
});


router.post('/modify',async (req,res,next)=>{
    // 채용공고 수정
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
});


module.exports = router;