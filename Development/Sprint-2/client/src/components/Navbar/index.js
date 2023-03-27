import {useNavigate, useLocation} from 'react-router-dom';
import React from 'react';
import './navbar.css'
import logo from '../../images/logo.png'
import Cookies from 'js-cookie'
import jwt_decoded from 'jwt-decode'
import axios from 'axios'

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
  const location = useLocation()
  let role = " "
  if (location.state !== null){
    role = location.state.role
  }
  
  const navigate = useNavigate()

  const logout = async () => {
    await axios.get('http://localhost:8000/logout', {withCredentials: true})
    navigate('/')  
  }

  const home = () => {
    navigate('/home', {state:{role:location.state.role, email:location.state.email}})
  }
  const home2 = () => {
    if(role == 'Admin'){
    navigate('/home2', {state:{role:'Admin', email:location.state.email}})
    }
  }


  const adminprofile = () => {
    let email = " "
    let pwd = ''
    if (location.state.email !== null){
      console.log('not null email')
      email = location.state.email
    }
    if (location.state.role !== null){
      console.log('not null role')
      role = location.state.role
    }
    if (location.state.pwd !== null){
      console.log('pwd not null')
      pwd = location.state.pwd
    }
    else{
      console.log('null')
    }
    // const r = location.state.role
    console.log('email in navbar', email)
    console.log('role in navbar', role)
    navigate('/adminprofile', {state:{role:role,email:email, pass:pwd}})
  }
  
  const influencerProfile = () => {
    let email = " "
    let pwd = ''
    if (location.state.email !== null){
      console.log('not null email')
      email = location.state.email
    }
    if (location.state.role !== null){
      console.log('not null role')
      role = location.state.role
    }
    if (location.state.pwd !== null){
      console.log('pwd not null')
      pwd = location.state.pwd
    }
    else{
      console.log('null')
    }
    console.log('email in navbar', email)
    console.log('role in navbar', role)
    navigate('/influencerProfile', {state:{role:role,email:email, pass:pwd}})
  }

  const clientProfile = () => {
    let email = " "
    let pwd = ''
    if (location.state.email !== null){
      console.log('not null email')
      email = location.state.email
    }
    if (location.state.role !== null){
      console.log('not null role')
      role = location.state.role
    }
    if (location.state.pwd !== null){
      console.log('pwd not null')
      pwd = location.state.pwd
    }
    else{
      console.log('null')
    }
    console.log('email in navbar', email)
    console.log('role in navbar', role)
    navigate('/clientProfile', {state:{role:role,email:email, pass:pwd}})
  }

  const redirectHomepage = () => {
    let email = " "
    let pwd = ''
    if (location.state.email !== null){
      console.log('not null email')
      email = location.state.email
    }
    if (location.state.role !== null){
      console.log('not null role')
      role = location.state.role
    }
    if (location.state.pwd !== null){
      console.log('pwd not null')
      pwd = location.state.pwd
    }
    else{
      console.log('null')
    }
    console.log('email in navbar', email)
    console.log('role in navbar', role)
    navigate('/home', {state:{role:role,email:email, pass:pwd}})
  }

  const redirectHomepage2 = () => {
    let email = " "
    let pwd = ''
    if (location.state.email !== null){
      console.log('not null email')
      email = location.state.email
    }
    if (location.state.role !== null){
      console.log('not null role')
      role = location.state.role
    }
    if (location.state.pwd !== null){
      console.log('pwd not null')
      pwd = location.state.pwd
    }
    else{
      console.log('null')
    }
    console.log('email in navbar', email)
    console.log('role in navbar', role)
    navigate('/home2', {state:{role:role,email:email, pass:pwd}})
  }

  const viewAnnounce = () => {
    let email = " "
    let pwd = ''
    if (location.state.email !== null){
      console.log('not null email')
      email = location.state.email
    }
    if (location.state.role !== null){
      console.log('not null role')
      role = location.state.role
    }
    if (location.state.pwd !== null){
      console.log('pwd not null')
      pwd = location.state.pwd
    }
    else{
      console.log('null')
    }
    console.log('email in navbar', email)
    console.log('role in navbar', role)
    navigate('/sendannouncement', {state:{role:role,email:email, pass:pwd}})
  }

  const sendAnnounce = () => {
    let email = " "
    let pwd = ''
    if (location.state.email !== null){
      console.log('not null email')
      email = location.state.email
    }
    if (location.state.role !== null){
      console.log('not null role')
      role = location.state.role
    }
    if (location.state.pwd !== null){
      console.log('pwd not null')
      pwd = location.state.pwd
    }
    else{
      console.log('null')
    }
    console.log('email in navbar', email)
    console.log('role in navbar', role)
    navigate('/viewannouncement', {state:{role:role,email:email, pass:pwd}})
  }



  if(role && role == "Admin") {
    return (
        <Nav>
          <Bars />
          <NavMenu>
            <NavLink to='/home2' activestyle="true">
              <img src={logo} />
            </NavLink>
            {/* <NavLink to='/home2' activestyle="true">
              Home
            </NavLink> */}
            <button  className='buttonprofile3' onClick={redirectHomepage2} activestyle="true">Home </button>
            <button  className='buttonprofile3' onClick={viewAnnounce} activestyle="true">Send Announcement </button>
            <button  className='buttonprofile3' onClick={sendAnnounce} activestyle="true">View Announcements</button>
            
            {/* <NavLink to='/access' activestyle="true">
              Restrict Access */}
            <button  className='buttonprofile3' onClick={sendAnnounce} activestyle="true">Restrict Access</button>
            {/* </NavLink> */}
            <button  className='buttonprofile3' onClick={adminprofile} activestyle="true">Profile
            </button>
          </NavMenu>
          <NavBtn>
            <NavBtnLink onClick={logout} to='/'>Sign Out</NavBtnLink>
          </NavBtn>
        </Nav>
    );
  }
  
  if(role && role == "Client") {
    return (
        <Nav>
          <Bars />
          <NavMenu>
            <NavLink to='/home'  activestyle="true">
              <img src={logo}/>
            </NavLink>
          <form className='searchform'>
              <input className='searchinput' name='search' id='search' type="text" placeholder='Search for an influencer'/>
          </form>
          <button  className='buttonprofile2' onClick={redirectHomepage} activestyle="true">Back to HomePage </button>
          {/* <NavLink to='/viewannouncement' activestyle="true">
              View Announcements
            </NavLink> */}
          <button  className='buttonprofile3' onClick={sendAnnounce} activestyle="true">View Announcements</button>

            <button className='buttonprofile' onClick={clientProfile} activestyle="true">Profile </button>
          </NavMenu>
          <NavBtn>
            <NavBtnLink onClick={logout} to='/'>Sign Out</NavBtnLink>
          </NavBtn>
        </Nav>
    );
  }

  else if(role && role == "Influencer") {
    return (
        <Nav>
          <Bars />
          <NavMenu>
            <NavLink to='/home' activestyle="true">
              <img src={logo} />
            </NavLink>
            <button  className='buttonprofile2' onClick={redirectHomepage} activestyle="true">Back to HomePage </button>
            {/* <NavLink to='/viewannouncement' activestyle="true">
              View Announcements
            </NavLink> */}
            <button  className='buttonprofile3' onClick={sendAnnounce} activestyle="true">View Announcements</button>

            <button onClick={influencerProfile} className='buttonprofile' activestyle="true">Profile
            </button>
          </NavMenu>
          <NavBtn>
            <NavBtnLink onClick={logout} to='/'>Sign Out</NavBtnLink>
          </NavBtn>
        </Nav>
    );
  }
  else{
    return (
        <Nav>
          <Bars />
          <NavMenu>
            <NavLink to='/home' activestyle="true">
              <img src={logo} />
            </NavLink>
          </NavMenu>
        </Nav>
    );
  }

};
  
export default Navbar;