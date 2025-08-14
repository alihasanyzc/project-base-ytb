const express = require('express');
const router = express.Router();

router.get("/:id",(req,res,next)=>{
    res.json({
        body:req.body,
        param:req.params,
        query:req.query,
        headers:req.headers});
    });
    
    module.exports = router;
