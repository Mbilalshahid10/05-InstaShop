import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import axios from 'axios'
import './EditAdmin.css'
const  EditProfile =  ()=>{
  console.log('in edit admin')
  const location = useLocation()
  const navigate = useNavigate()

//   fName: allEntry.first, lName: allEntry.last, username: allEntry.username, email: allEntry.email

//   const email = location.state.email
//   const  = location.state.fName
//   const last_name = location.state.lName
//   const username = location.state.username
//   console.log('e,r,p,q', e, r,p,q)

//   const details = {role: r.toLowerCase(), e: e, pass:p}

//     // const [email, setEmail] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [userName, setUserName] = useState('')
//     // const [username, setUserName] = useState('')
//     // const [role, setrole] = useState('')
//     const [allEntry, setAllentry] = useState([]) 



//     useEffect(()=>{ 

//     axios.post("http://localhost:8000/adminProfile", details, {withCredentials: true})
//   .then(response => 
//     // console.log('type',response.data)
//     // console.log('details', response.data.first, response.data.last, response.data.email, response.data.username, response.data.role),
//     // response => 
//     setAllentry(response.data)
//     // response => 
//     // setFName(response.data.first), 
//     // response => 
//     // setLName(response.data.last), 
//     // response => 
//     // setUserName(response.data.username), 
//     // response => 
//     // // setAllentry(response.data)
//     // setrole(response.data.role) 
    
//   )
// },[])

//   console.log('aftr q', allEntry.email, allEntry.role, allEntry.first, allEntry.last, allEntry.username)

  
//     const navigate = useNavigate()

    const onClickHandler = (e) => {
        e.preventDefault()
        navigate('/ChangePass')



    //   navigate('/EditAdmin', {state:{fName: allEntry.first, lName: allEntry.last, username: allEntry.username}})
    }

//     const onClickEdit = () => {
//       navigate('/ChangePass')
//     }

  return (

    
    <div className="editap">
      <div className='editaparea'>
        {/* <p className='editapmsg'>YOU CANNOT EDIT DETAILS</p> */}
        <h1 className='editaptitle'>Edit Profile</h1>
        <form onSubmit={onClickHandler}>
          <label>
            <input name='fname' id='fname' value={location.state.fName} type="text" placeholder='First Name'  onChange={(e)=>setFName(e.target.value)}className='editapinput1'/>
          </label>
          <label>
            <input name='lname' id='lname' value={location.state.lName} type="text" placeholder='Last Name'  onChange={(e)=>setLName(e.target.value)} className='editapinput2'/>
          </label>
          {/* <label>
            <input name='email' id='email' value={email} type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}  className='editapinput1'/>
          </label> */}
          <label>
            <input value={location.state.username} name='username' id='username' type="text" placeholder='Username' onChange={(e)=>setUserName(e.target.value)} className='editapinput2'/>
          </label>
           <button className='editapbuttons' onClick={onClickHandler} >Change Password</button> 
        </form>
        
      </div>
    </div>
  );
}

export default EditProfile;