const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const app = express();
app.use(express.json());

const users = [];

app.post("/register", async(req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "Email and password are required" });
        }

        const userExits = users.find(user => users.email == email);
        if(userExits){
            return res.status(400).json({ error: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            email: email,
            password: hashedPassword
        }
        users.push(newUser);

        res.status(201).json({ message: "User Registered"});
    } catch(err){
        res.status(500).json({ error: err.message });
    }
})

app.listen(3000, () => {
    console.log("server running");
})