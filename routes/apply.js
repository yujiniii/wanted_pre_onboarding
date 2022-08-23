const express = require('express');
const router = express.Router();
const applyService = require('../services/apply_service')


router.get('/all', async(req,res,next)=>{
    applyService.getAllRecruit(req,res,next);
});

router.get('/:id/detail',async(req,res,next)=>{
    applyService.getRecruitDetail(req,res,next);
});

router.post('/:id/gogo',async(req,res,next)=>{
    applyService.postApplyLetsGo(req,res,next);
});

module.exports = router;