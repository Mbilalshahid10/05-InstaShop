// import {useNavigate, useLocation} from 'react-router-dom';
// import React from 'react';
// import './navbar.css'
// import logo from '../../images/logo.png'
// import Cookies from 'js-cookie'
// import jwt_decoded from 'jwt-decode'
// import axios from 'axios'

// import {
//   Nav,
//   NavLink,
//   Bars,
//   NavMenu,
//   NavBtn,
//   NavBtnLink,
// } from './NavbarElements';

// const NavbarAdmin = () => {
//   const location = useLocation()
//   let role = " "
//   if (location.state !== null){
//     role = location.state.role
//   }
//   const navigate = useNavigate()

//   const logout = async () => {
//     await axios.get('https://colleeasy.herokuapp.com/logout', {withCredentials: true})
//     navigate('/')  
//   }

//   const home2 = () => {
//     if(role === 'Admin'){
//     navigate('/home2', {state:{role:location.state.role, email:location.state.email}})
//     }
//   }

//   const adminprofile = () => {
//     let email = " "
//     let pwd = ''
//     if (location.state.email !== null){
//       console.log('not null email')
//       email = location.state.email
//     }
//     if (location.state.role !== null){
//       console.log('not null role')
//       role = location.state.role
//     }
//     if (location.state.pwd !== null){
//       console.log('pwd not null')
//       pwd = location.state.pwd
//     }
//     else{
//       console.log('null')
//     }
//     navigate('/adminprofile', {state:{role:role,email:email, pass:pwd}})
//   }
//     return (
//         <Nav>
//           <Bars />
//           <NavMenu>
//             <NavLink to='/home2' activestyle="true">
//               <img src={logo} />
//             </NavLink>
//             <NavLink to='/home2' activestyle="true">
//               Home
//             </NavLink>
//             <NavLink to='/adminhome' activestyle="true">
//               Send Announcement
//             </NavLink>
//             <NavLink to='/access' activestyle="true">
//               Restrict Access
//             </NavLink>
//             <button onClick={adminprofile} activestyle="true">Profile
//             </button>
//           </NavMenu>
//           <NavBtn>
//             <NavBtnLink onClick={logout} to='/'>Sign Out</NavBtnLink>
//           </NavBtn>
//         </Nav>
//     );
// };

// export default NavbarAdmin;