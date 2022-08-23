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


module.exports = router;