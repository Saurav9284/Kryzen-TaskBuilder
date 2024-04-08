const express = require('express')
const UserModel = require('../Models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECERT} = require('../Config/db')

const UserController = express.Router();

// Signup

UserController.post('/register', async (req,res) => {
    const { name, email, password } = req.body
    if(!name || !email || !password){
        return res.send({msg:'All fields required!'})
    }
    try {
        const exist = await UserModel.findOne({ email })
        if(exist){
            return res.send({msg:'User already exist, Please login'})
        }
        bcrypt.hash(password,5, async (err,hash) => {
            if(err){
                return res.send({msg:'Internal server error'})
            }
            try {
                const user = await UserModel.create({
                    name:name,
                    email:email,
                    password:hash
                })
                console.log(user)
                res.send({msg:'Signup successfull'})

            } catch (error) {
                console.log(error)
            }
        })
    } catch (error) {
        console.log(error)
    }
});


// Login

UserController.post('/login', async (req,res) => {
    const { email, password } = req.body
    if(!email || !password){
        return res.send({msg:'All fields required!'})
    }
    try {
        const user = await UserModel.findOne({ email })
        if(!user){
            return res.send({msg:'Signup first!'})
        }
        bcrypt.compare(password,user.password, function(err,result){
            if(result){
                const token = jwt.sign({ userId: user._id }, JWT_SECERT)
                res.send({
                    msg:'Login successfull',
                    token:token,
                    userData: {
                        name: user.name,
                        email: user.email
                    }
                })
            }
            else{
                res.send({msg:'Invalid Credentials!'})
            }
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = UserController