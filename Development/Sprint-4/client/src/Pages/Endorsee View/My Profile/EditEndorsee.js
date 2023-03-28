import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate , useLocation } from 'react-router-dom'
import './EditEndorsee.css'

const EditEndorseeProfile = ()=>{

    const location = useLocation()
    const e = location.state.email
    const r = location.state.role
    const p = location.state.pass
    console.log('e,r,p', e, r,p)

    const details = {role: r.toLowerCase(), e: e, pass:p}
    const [allEntry, setAllentry] = useState([]) 
    useEffect(()=>{ 
    axios.post("http://localhost:8000/InfluencerProfile", details, {withCredentials: true})
  .then(response =>
    setAllentry(response.data)
  )
},[])

  const navigate = useNavigate()
  const onClickHandler = () => {
    console.log("here :" , location.state)
      navigate('/ChangePass' , {state:{email : e }})
    }

  return (
    <div className="editep">
      <div className='editeparea'>
        <p className='editepmsg'>YOU CAN ONLY EDIT SELECTED FIELDS</p>
        <h1 className='editeptitle'>Influencer Profile</h1>
        {/* <button className='editepbuttons' onClick = {EditEndorsee}>Confirm Changes</button> */}
        <p className='editapinput1'>{'Name : ' + allEntry.first + ' '+ allEntry.last }</p>
        <p className='editapinput2'>{'User Name : ' + allEntry.username}</p>
        <p className='editapinput1'>{'Email : ' + allEntry.email}</p>
        <p className='editapinput2'>{'Role : ' + allEntry.role}</p>
        <p className='editapinput1'>{'DOB : ' + allEntry.dob}</p>
        <p className='editapinput2'>{'Link : ' + allEntry.profileLink}</p>
        <p className='editapinput1'>{'Niche : ' + allEntry.niche}</p>
        <button className='editepbuttons' onClick = {onClickHandler}>Change Password</button>
      </div>
    </div>
  );
}

export default EditEndorseeProfile;

