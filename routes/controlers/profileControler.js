const { validationResult } = require('express-validator')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')

//получить мой профиль
module.exports.getMe = async (req, res)=>{
    try{    
        const profile = await Profile.findOne({ user: req.user.id}).populate('user', ['name', 'avatar'])
        if(!profile){
            return res.status(400).json({msg: 'Даного профайла не сушествует'})
        }
         res.json(profile)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Eroor')
    }
}
//Создать или Изменить Профиль
module.exports.createOrUpdate = async (req, res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    const {company, website, location, bio, status,
            githubusername, skills, youtube, facebook, twitter,
            instagram, linkedin} = req.body
    
    const profileFields = {}
    profileFields.user = req.user.id
    if(company) profileFields.company = company
    if(website) profileFields.website = website
    if(location) profileFields.location = location
    if(bio) profileFields.bio = bio
    if(status) profileFields.status = status
    if(githubusername) profileFields.githubusername = githubusername
    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }
    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube
    if(facebook) profileFields.social.youtube =facebook
    if(twitter) profileFields.social.youtube = twitter
    if(instagram) profileFields.social.youtube = instagram
    if(linkedin) profileFields.social.youtube = linkedin

    try{
        let profile = await Profile.findOne({user: req.user.id})
        
        if(profile){
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            )
            console.log(profile)
            return res.json(profile)
        }
        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}
//получить все профили
module.exports.getAllPofiles = async (req, res) =>{
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}
// Получить прфиль по ID
module.exports.getProfileById = async (req, res) =>{
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar'])
        console.log(profile)
        if(!profile){
            return res.status(400).json({msg:'Такой профиль не найдет'})
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}
//Удалить User
module.exports.removeUser = async (req, res) =>{
    try {
        await Post.deleteMany({user: req.user.id})
        await Profile.findOneAndRemove({user: req.user.id})
        await User.findOneAndRemove({_id:req.user.id})
        res.json({msg:'Пользовател был удален'})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    } 
}
//Добавить Опыт Работы
module.exports.createExperience = async (req, res) =>{
    console.log(req.body)
    const eroors = validationResult(req)
    console.log(eroors)
    if(!eroors.isEmpty()){
        return res.status(400).json({eroors: eroors.array()})
    }
    
    const {tittle, company, location, from, to, current, description} = req.body
    const newExp = {tittle, company, location, from, to, current,description }
    try {
        const profile = await Profile.findOne({user: req.user.id})
        profile.experience.unshift(newExp)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Eroor')
    }
}
// Удалить опыт работы
module.exports.removeExperience = async (req, res) =>{
    try {
        const profile = await Profile.findOne({user: req.user.id})
        const expId = profile.experience.map( item => item.id).indexOf(req.params.exp_id)
        profile.experience.splice(expId, 1)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}
// Довить Образование
module.exports.createEducation = async(req, res) =>{
    const eroors = validationResult(req)
    console.log(eroors)
    if(!eroors.isEmpty()){
        return res.status(400).json({eroors: eroors.array()})
    }
    
    const {school, degree, fieldofstudy, from, to, current, description} = req.body
    const newEducation = {school, degree, fieldofstudy, from, to, current, description}
    try {
        const profile = await Profile.findOne({user: req.user.id})
        profile.education.unshift(newEducation)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Eroor')
    }
}
//Удалить образивание
module.exports.removeEducation = async (req, res) =>{
    try {
        const profile = await Profile.findOne({user: req.user.id})
        const expId = profile.education.map( item => item.id).indexOf(req.params.edc_id)
        profile.education.splice(expId, 1)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}
