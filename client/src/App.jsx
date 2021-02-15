import React, { useEffect } from 'react'
import './App.css'
import { Redirect, Route, Switch } from 'react-router-dom'
import { userLoad } from './actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import Alert from './components/Utilits/Alert'
import PrivatRoute from './components/Utilits/PrivatRouter'
import LendingPage from './components/authPages/LendingPage'
import LoginPage from './components/authPages/LoginPage'
import NavBar from './components/navBar/NavBar'
import RegisterPage from './components/authPages/RegisterPage'
import DashBoard from './components/DashBoard/DashBoard'
import CreateProfile from './components/ProfileSettings/CreateProfile'
import setAuthToken from './actions/actionUtil/setAuthToken'
import EditProfile from './components/ProfileSettings/EditProfile'
import AddEducation from './components/ProfileSettings/AddEducation'
import AddExperience from './components/ProfileSettings/AddExperience'
import Profiles from './components/ProfilesPages/Profiles'
import Profile from './components/ProfilesPages/Profile/Profile'
import Posts from './components/PostsPage/Posts'
import Post from './components/PostsPage/Post'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {

  const dispatch = useDispatch()

  const isAuth = useSelector(state => state.auth.isAuth)

  useEffect(()=>{
    dispatch(userLoad())
  },[])

  return (
   <>
    <NavBar/>
    <Alert />
      <Switch>
        {!isAuth && <Route exact path='/' component={LendingPage}/>}
        {!isAuth && <Route exact path='/login' component={LoginPage} />}
        {!isAuth && <Route exact path='/register' component={RegisterPage}/>}
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/user/:id?' component={Profile}/>
        <Route exact path='/posts' component={Posts}/>
        <Route exact path='/posts/:id?' component={Post}/>
        <PrivatRoute exact path='/dashboard' component={DashBoard} />
        <PrivatRoute exact path='/craete-profile' component={CreateProfile} />
        <PrivatRoute exact path='/edit-profile' component={EditProfile}/>
        <PrivatRoute exact path='/add-education' component={AddEducation} />
        <PrivatRoute exact path='/add-experience' component={AddExperience} />
        <Redirect to='/dashboard' />
      </Switch>
   </>
  )
}

export default App
