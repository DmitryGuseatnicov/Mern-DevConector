const { validationResult } = require('express-validator')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')

module.exports.createPost = async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()})
    }
    try {
        console.log(req.body)
        const user = await User.findById(req.user.id).select("-password")
        console.log(user)
        const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
    })
    console.log(newPost)
    const post = await newPost.save()
    res.json(post)
    } catch (err) {
        console.errors(err.message)
        res.status(500).send('Server Error')
    }
}

module.exports.removePost = async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({msg:'Данный пост не был найден'})
        }

        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg:'Пользователь не авторизован'})
        }
        await post.remove()
        res.json({msg:'Пост был удален'})
    } catch (err) {
        console.errors(err.message)
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg:'Данный пост не был найден'})
        }
        res.status(500).send('Server Error')
    }
}

module.exports.getAllPosts = async (req, res) =>{
    try {
        const posts = await Post.find().sort({date:-1})
        res.json(posts)
    } catch (err) {
        console.errors(err.message)
        res.status(500).send('Server Error')
    }  
}

module.exports.getOnePost = async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id)
        console.log(post)
        if(!post){
            return res.status(404).json({msg:'Данный пост не был найден'})
        }
        res.json(post)
    } catch (err) {
        console.errors(err.message)
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg:'Данный пост не был найден'})
        }
        res.status(500).send('Server Error')
    }
}

module.exports.likePost = async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg:'Вы уже лайнули этот пост'})
        }
        
        post.likes.unshift({user: req.user.id})
        await post.save()
        console.log(post.likes)
        res.json(post.likes)
    } catch (err) {
        console.errors(err.message)
        res.status(500).send('Server Error')
    }
}

module.exports.unLikePost = async(req, res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg:'Вы уже лайнули этот пост'})
        }
        const remodeIndex = post.likes.map(like => like.user.toString().indexOf(req.user.id))
        post.likes.splice(remodeIndex, 1)
        await post.save()
        res.json(post.likes)
    } catch (err) {
        console.errors(err.message)
        res.status(500).send('Server Error')
    }
}

module.exports.createComment = async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()})
    }
    try {
        const user = await User.findById(req.user.is).select("-password")
        const post = await Post.findById(req.params.id)

        const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
    }
    post.comments.unshift(newComment)

    await post.save()
    res.json(post.comments)

    } catch (err) {
        console.errors(err.message)
        res.status(500).send('Server Error')
    }
}

module.exports.removeComment = async (req, res) =>{
    try {
        const post = Post.findById(req.params.id)
        const comment = post.comment.find(comment =>comment.id === req.params.comment_id)
        if(!comment){
            return res.status(404).json({msg:'Коментарий не найдее'})
        }
        if(comment.user.toString() !== req.user.id){
            return res.status(400).json({msg:'Пользователь не залогинен'})
        }
        const remodeIndex = post.comments.map(comment => comment.user.toString().indexOf(req.user.id))
        post.comments.splice(remodeIndex, 1)
        await post.save()
        res.json(post.comments)
    } catch (err) { 
        console.errors(err.message)
        res.status(500).send('Server Error')
    }
}