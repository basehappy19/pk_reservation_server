const User = require('../Models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const secretKey = process.env.SECRET_KEY
exports.addUser = async(req,res) => {
    try {

        const { username, password, name } = req.body

        var user = await User.findOne({ where: { username: username } })
        if(user){
            return res.json({ message: 'มีชื่อผู้ใช้นี้แล้ว',type: "error"}).status(400)
        } 
        // Encrypt
        const salt = await bcrypt.genSalt(10)
        const userData = {
            username: username,
            password: password,
            name : name,
        }
        userData.password = await bcrypt.hash(password, salt)

        await User.create(userData)
        res.json({
            message: "สร้างบัญชีผู้ใช้เรียบร้อย",
            type: "success"
        }).status(201)
    } catch (error) {
        const errorMessages = error.errors ? error.errors.map(e => e.message) : [error.message];
        res.status(500).json({
            message: 'เกิดปัญหาเพิ่มผู้ใช้ไม่ได้',
            errors: errorMessages
        })
    }
}

exports.login = async(req, res) => {
    try {
        const { username, password } = req.body;
        var user = await User.findOne({ where: { username: username }});
        
        if(user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).send("Password Invalid!!");
            }
            var payload = {
                user: {
                    userId: user.id,
                    username: user.username,
                    name: user.name,
                    canManageUsers: user.canManageUsers
                }
            };
            jwt.sign(payload,secretKey,{ expiresIn: '1d'},(err,token)=>{
                if(err) throw err;
                res.json({token,payload})
            })
        } else {
            res.status(400).send("User Not Found!!!");
        }
    } catch (error) {
        res.status(500).json({
            message: 'Login Error',
        });
    }
};




