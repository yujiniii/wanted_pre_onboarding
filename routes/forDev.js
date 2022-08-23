const express = require('express');
const router = express.Router();
const {User, Company} = require('../models');


router.post('/createCompany', async (req,res,next)=>{
    // 회사 등록
    const newCompany = await Company.create({
        company_name : req.body.name,
        country : req.body.country,
        city : req.body.city
    });
    console.log(newCompany);
    res.status(200).json({newCompany});
});

router.post('/createUser', async (req,res,next)=>{
    // 사용자 등록
    const newUser = await User.create({
        user_name:req.body.name,
        is_applied:false
    });
    console.log(newUser);
    res.status(200).json({newUser});
});


module.exports = router;