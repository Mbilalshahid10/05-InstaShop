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



  if(role && role == "Admin") {
    return (
        <Nav>
          <Bars />
          <NavMenu>
            <NavLink to='/home' activestyle="true">
              <img src={logo} />
            </NavLink>
            <NavLink to='/home' activestyle="true">
              Home
            </NavLink>
            <NavLink to='/announce' activestyle="true">
              Send Announcement
            </NavLink>
            <NavLink to='/access' activestyle="true">
              Restrict Access
            </NavLink>
            <button onClick={adminprofile} activestyle="true">Profile
            </button>
          </NavMenu>
          <NavBtn>
            <NavBtnLink onClick={logout} to='/'>Sign Out</NavBtnLink>
          </NavBtn>
        </Nav>
    );
  }
  
  else if(role && role == "Client") {
    return (
        <Nav>
          <Bars />
          <NavMenu>
            <NavLink to='/home' activestyle="true">
              <img src={logo} />
            </NavLink>
            <form className='searchform'>
              <input className='searchinput' name='search' id='search' type="text" placeholder='Search for an influencer'/>
            </form>
            <NavLink to='/home' activestyle="true">
              Home
            </NavLink>
            <NavLink to='/clientorders' activestyle="true">
              Orders
            </NavLink>
            <button onClick={clientProfile} activestyle="true">Profile
            </button>
            {/* <NavLink to='/clientprofile' activestyle="true">
              Profile
            </NavLink> */}
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
            <NavLink to='/home' activestyle="true">
              Home
            </NavLink>
            <NavLink to='/influencerorders' activestyle="true">
              Orders
            </NavLink>
            {/* <NavLink to='/influencerProfile' activestyle="true">
              Profile
            </NavLink> */}
            <button onClick={influencerProfile} activestyle="true">Profile
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