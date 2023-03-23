import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import './EditAdmin.css'


const  EditAdminProfile =()=>{
  const location = useLocation()
  const e = location.state.email
  const r = location.state.role
  const p = location.state.pass
  console.log('e,r,p', e, r,p)

  const details = {role: r.toLowerCase(), e: e, pass:p}
    const [allEntry, setAllentry] = useState([]) 
    useEffect(()=>{ 
    axios.post("http://localhost:8000/adminProfile", details, {withCredentials: true})
  .then(response => 
    // console.log('type',response.data)
    // console.log('details', response.data.first, response.data.last, response.data.email, response.data.username, response.data.role),
    // response => 
    setAllentry(response.data)
  )
},[])

  console.log('aftr q', allEntry.email, allEntry.role, allEntry.first, allEntry.last, allEntry.username)

    const navigate = useNavigate()
    const onClickHandler = () => {
      navigate('/ChangePass', {state:{email:e, role: r, pass:p}})
    }
    const onClickEdit = () => {
      navigate('/EditProfile', {state:{fName: allEntry.first, lName: allEntry.last, username: allEntry.username, email: allEntry.email}}) 
    }

  return (
    <div className="editap">
      <div className='editaparea'>
        <p className='editapmsg'>YOU CANNOT EDIT DETAILS</p>
        <h1 className='editaptitle'>View Profile</h1>

        <p className='editapinput1'>{'Name : ' + allEntry.first + ' '+ allEntry.last }</p>
        <p className='editapinput2'>{'User Name : ' + allEntry.username}</p>
        <p className='editapinput1'>{'Email : ' + allEntry.email}</p>
        <p className='editapinput2'>{'Role : ' + allEntry.role}</p>
        <button className='editapbuttons' onClick={onClickEdit} >Edit Profile</button>
        <button className='editapbuttons' onClick={onClickHandler} >Change Password</button>
      </div>
    </div>
  );
}

export default EditAdminProfile;