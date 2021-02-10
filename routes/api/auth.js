const express = require('express')
const router = express.Router()
const authMiddleWare = require('../../middleware/authMiddleware')
const { check } = require('express-validator')
const { auth, register, login } = require('../controlers/authControler')


//path          api/auth 
//видимость     Публичная 
//описание      Валидность Пользователя
router.get('/', authMiddleWare, auth)

//path          api/auth/login 
//видимость     Публичная 
//описание      Залогинится
router.post('/login', [
    check('email', 'Ввидите коректный email').isEmail(),
    check('password', 'Неверные Логин или Пароль').isLength({min: 6})
], login)
 
//path          api/auth/register 
//видимость     Публичная 
//описание      Зарегистрироваться
router.post('/register',
[
    check('name', 'Введите ваще имя').not().isEmpty(),
    check('email', 'Ввидите коректный email').isEmail(),
    check('password', 'Пароль должен содержать минимум 6 символов').isLength({min: 6})
],register)



module.exports = router