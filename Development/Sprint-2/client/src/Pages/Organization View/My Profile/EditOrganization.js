import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate , useLocation } from 'react-router-dom'
import './EditOrganization.css'

const EditOrgProfile = ()=>{
  
  const location = useLocation()
  const e = location.state.email
  const r = location.state.role
  const p = location.state.pass
  console.log('e,r,p', e, r,p)

  const details = {role: r.toLowerCase(), e: e, pass:p}
  const [allEntry, setAllentry] = useState([]) 
  useEffect(()=>{ 
  axios.post("http://localhost:8000/clientProfile", details, {withCredentials: true})
.then(response =>
  setAllentry(response.data)
)
},[])

  const navigate = useNavigate()
    const onClickHandler = () => {
      navigate('/ChangePass' , {state:{email : e }})
    }   
  return (
    <div className="editop">
      <div className='editeparea'>
        <p className='editepmsg'>YOU CAN ONLY EDIT SELECTED FIELDS</p>
        <h1 className='editeptitle'>Client Profile</h1>
        {/* <button className='editepbuttons' onClick = {EditEndorsee}>Confirm Changes</button> */}
        <p className='editapinput1'>{'Name : ' + allEntry.name }</p>
        <p className='editapinput2'>{'Email : ' + allEntry.email}</p>
        <p className='editapinput2'>{'Role : ' + allEntry.role}</p>
        <p className='editapinput1'>{'Category : ' + allEntry.category}</p>
        <p className='editapinput2'>{'Country : ' + allEntry.country}</p>
        <p className='editapinput1'>{'Zipcode : ' + allEntry.zipcode}</p>
        <p className='editapinput1'>{'Address : ' + allEntry.address}</p>

        <button className='editepbuttons' onClick = {onClickHandler}>Change Password</button>
      </div>
    </div>
  );
}

export default EditOrgProfile;