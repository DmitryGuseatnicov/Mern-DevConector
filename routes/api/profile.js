const express = require('express')
const router = express.Router()
const authMiddleware = require('./../../middleware/authMiddleware')
const { check } = require('express-validator')
const {getMe, createOrUpdate, getAllPofiles, 
       getProfileById, removeUser, removeEducation, removeExperience,
       createEducation, createExperience } = require('./../controlers/profileControler')


//path          api/profile/me 
//видимость     Публичная 
//описание      Получение моего Профиля
router.get('/me',authMiddleware, getMe )

//path          api/profile 
//видимость     Приватная 
//описание      создать или изменить Профиля
router.post('/',[authMiddleware,
    [
        check('status', ' Статур должен быть указан').not().isEmpty(),
        check('skills', 'Навыки должны быть указаны').not().isEmpty()
    ]
], createOrUpdate)
    
//path          api/profile 
//видимость     Публичная 
//описание      Получить все профили
router.get('/', getAllPofiles)

//path          api/profile/user/:user_id
//видимость     Публичная
//описание      Получить профиль по ID
router.get('/user/:user_id', getProfileById)

//path          api/profile
//видимость     Приватная
//описание      Получить профиль по ID
router.delete('/', authMiddleware , removeUser)

 
//path          api/profile/experience 
//видимость     Приватная
//описание      Добавить Опыт работы
router.put('/experience',[authMiddleware,
    [
        check('tittle', 'заголовок должен бытьзаполнен').not().isEmpty(),
        check('company', 'компания должен бытьзаполнен').not().isEmpty(),
        check('from', 'период  должен бытьзаполнен').not().isEmpty(),
        check('location', 'Место должно быть указано')
    ]
], createExperience)

//path          api/profile/experience/:exp_id
//видимость     Приватная
//описание      Удалить Опыт работы
router.delete('/experience/:exp_id', authMiddleware, removeExperience)

//path          api/profile/education
//видимость     Приватная
//описание      Добавить Образование 
router.put('/education',[authMiddleware,
    [
        check('school', 'заголовок должен бытьзаполнен').not().isEmpty(),
        check('degree', 'компания должен бытьзаполнен').not().isEmpty(),
        check('fieldofstudy', 'период  должен бытьзаполнен').not().isEmpty(),
        check('from', 'Место должно быть указано')
    ]
], createEducation)

//path          api/profile/education/:edu_id
//видимость     Приватная
//описание      Удалить Образование 
router.delete('/education/:edc_id', authMiddleware, removeEducation)

module.exports = router