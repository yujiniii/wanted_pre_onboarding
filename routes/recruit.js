const express = require('express');
const router = express.Router();
const recruitService = require('../services/recruit_service');


router.post('/new', async(req,res,next)=>{
    recruitService.postNewRecruit(req,res,next);
});

router.post('/modify',async(req,res,next)=>{
    recruitService.postUpdateRecruit(req,res,next);
});

router.post('/delete',async(req,res,next)=>{
    recruitService.postDeleteRecruit(req,res,next);
});


module.exports = router;