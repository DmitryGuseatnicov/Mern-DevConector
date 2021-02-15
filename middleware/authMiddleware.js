const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next){
    const token = req.header('x-auth-token')
    console.log(token)
    if(!token){
        return res.status(401).json({msg:"Отсутствует токен авторизации"})
    }
    try{
        const decodet  = jwt.verify(token, config.get('jwtToken'))
        req.user = decodet.user
        next()
    }catch(err){    
        res.status(401).json({msg:"Невалидный токен"})
    }
}   