const express = require('express')
const router = express.Router()
const authMiddleware = require('./../../middleware/authMiddleware')
const { check } = require('express-validator')
const { createPost, getAllPosts, getOnePost, removePost, likePost, unLikePost, createComment, removeComment } = require('../controlers/postControler')


//path          api/posts 
//видимость     Приватная 
//описание      Создать пост
router.post('/',[authMiddleware,
    [
        check('text', 'Пост должен содержать больше одного символа')
    ]
], createPost)

//path          api/posts 
//видимость     Публичная 
//описание      Получить все посты
router.get('/', getAllPosts)

//path          api/posts/:id 
//видимость     Публичная 
//описание      Получить один пост
router.get('/:id', getOnePost)

//api/posts удали пост
//path          api/posts 
//видимость     Приватная 
//описание      Удалить Пост
router.delete('/:id', authMiddleware, removePost)

//path          api/post/like/:id
//видимость     Приватная 
//описание      Лайкнуть Пост
router.put('/like/:id', authMiddleware, likePost)

//path          api/post/unlike/:id 
//видимость     Приватная 
//описание      Убрать Лайк
router.put('/unlike/:id', authMiddleware, unLikePost)

//path          //api/posts/comment/:id 
//видимость     Приватная 
//описание      Создать Комментарий
router.post('/comment/:postId',[authMiddleware,
    [
        check('text', 'Пост должен содержать больше одного символа')
    ]
], createComment)

//path          api/post/commet/:id/:comment_id 
//видимость     Приватная 
//описание      Удалить Комментарий    
router.delete('/commet/:id/:comment_id', authMiddleware, removeComment)

module.exports = router