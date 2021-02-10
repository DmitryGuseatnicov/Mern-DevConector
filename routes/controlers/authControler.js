const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('./../../models/User')
const { validationResult } = require('express-validator')

module.exports.auth = async (req, res) =>{

    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch(err){
        console.error(err.message)
        res.status(500).send('server eroor')
    }
}

module.exports.login = async (req, res) =>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {email, password} = req.body
    try{
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json([{msg:'Данный пользователь не найден'}])
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json([{msg:'Данный пользователь не найден'}])
        }

        const payload ={
            user:{
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtToken'), {expiresIn:'1h'}, (err, token)=>{
            if(err) throw err
            res.json({token})
        })
        
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server eroor')
    }
}

module.exports.register = async (req, res) =>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    const {name, email, password} = req.body
    
    try{
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json([{msg:'Данный пользователь уже сущесвует'}])
        }

        const avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        })
    
        user = new User({
            name, email, password, avatar
        })
    
        const solt = await bcrypt.genSalt(9)
            
        user.password = await bcrypt.hash(password, solt)
    
        await user.save()
    
        const payload ={
            user:{
                id:user.id
            }
        }

        jwt.sign(payload, config.get('jwtToken'), {expiresIn:'1h'}, (err, token)=>{
            if(err) throw err
            res.json({token})
        })
        }catch(err){
            console.error(err.message)
            res.status(500).send('Server eroor')
        }
    }

