const express = require('express');
const router = express.Router();
const {Company} = require('../models');


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



module.exports = router;