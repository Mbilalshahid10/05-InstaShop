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

const NavbarInfluencer = () => {
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

  if(role && role == "Influencer") {
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
  
export default NavbarInfluencer;