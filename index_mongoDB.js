const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const JWT_SECRET = " my_secret_key";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://prashayjoonmc24b06004:Arthur1995@cluster0.4nprgz3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB", err);
});

function hashPassword(password){
    return crypto.createHash("sha256").update(password).digest("hex");
}

app.post("/submit", async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        const hashedPassword = hashPassword(password);

        const userData = new User({
                name,
                email,
                password:hashedPassword
        });

        await userData.save();
        res.json({message:"Data received successfully"});
    } catch(error){
        res.status(500).json({message:"Error saving data", error});
    }
});

app.post("/login", async(req,res)=>{
    const {email,password} = req.body;
    
    try{
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(401).json({message: "User not found"});
        }

        const hashedInputPassword = hashPassword(password);

        if(existingUser.password !== hashedInputPassword){
            return res.status(401).json({message:"Invalid password"});
        }

        const token = jwt.sign({userId: existingUser._id}, JWT_SECRET, {expiresIn: "1h"});

        res.json({message:"Login Successful", token});
    }catch(error){
        res.status(500).json({message:"Server error- ", error});
    }
});

function authenticateToken(req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).json({message: "Missing Token"});

    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET ,(err,user)=>{
        if(err) return res.status(403).json({message: "Invalid Token"});
        req.user = user;
        next();
    })
}

app.get("/protected", authenticateToken, (req,res)=>{
    res.json({message: "Welcome user", user: req.user});
})

app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
});