const express=require('express');
const dotenv=require('dotenv').config();
const {dbConnect}=require('./db/db.js');
const cookieParser=require('cookie-parser');

const app=express();

app.use(express.json());
app.use(cookieParser());

dbConnect();

const PORT=process.env.PORT || 7002;

const authRoutes=require("./routes/authRoutes.js")
const userRoutes=require("./routes/userRoutes.js");

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})