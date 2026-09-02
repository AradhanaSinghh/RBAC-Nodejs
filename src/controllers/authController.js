const userModel=require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');

const register=async (req,res)=>{
    const {username,password,role}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);
    
    const newUser=await userModel.create({
        username,
        password:hashedPassword,
        role
    })
    await newUser.save();
    res.status(201).json({
        message:`user registered with username ${username}`
    })
}
const login=async (req,res)=>{
    const {username,password}=req.body;
    const user=await userModel.findOne({username});
    if(!user){
        res.status(401).json(`Invalid username or password`);
    }
    const isPasswordMatched=await bcrypt.compare(password,user.password);

    if(!isPasswordMatched){
        res.status(401).json(`Invalid username or password`);
    }
    const token=jwt.sign({
        id:user._id,
        role:user.role
    },
    process.env.JWT_SECRET,
    {expiresIn:"1h"}
)
res.cookie("token",token)

    res.status(201).json({
        message:"user fetched successfully!",
        user:{
            username:user.username,
            role:user.role
        }
    })
}

module.exports={
    register,
    login
}