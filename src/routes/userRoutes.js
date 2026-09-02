const express=require('express');
const router=express.Router();
const verifyToken=require("../middlewares/authMiddleware")
const authorizeRoles=require("../middlewares/roleMiddleware");

//only admin ccan access this router
router.get("/admin",verifyToken,authorizeRoles("admin"),(req,res)=>{
    res.json({
        message:"welcome admin"
    })
})

//both admin and manager can access this router
router.get("/manager",verifyToken,authorizeRoles("admin","manager"),(req,res)=>{
    res.json({
        message:"welcome manager"
    })
})

//all can access this router
router.get("/user",verifyToken,authorizeRoles("admin","user"),authorizeRoles("admin","manager","user"),(req,res)=>{
    res.json({
        message:"welcome user"
    })
})

module.exports=router;