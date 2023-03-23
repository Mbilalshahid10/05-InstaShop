// import axios from 'axios'
// import React, { useState } from 'react'
// import { Navigate, useNavigate } from 'react-router-dom'
// import './EditEndorsee.css'
// const EditEndorseeProfile = ()=>{
//     axios.get("http://localhost:8000/InfluencerProfile").then(res => {
//       console.log(res)
//     }).catch(err=>console.log("Error"))
//     const [email, setEmail] = useState("influencer@gmail.com")
//     const [fName, setFName] = useState("abc")
//     const [lName, setLName] = useState("def")
//     const [DOB, setDOB] = useState("10/10/2001")
//     const [LinkTree, setLinkTree] = useState("infl@insta.com")
//     const [username, setUserName] = useState("hello")
//     const [allEntry, setAllentry] = useState([])

//     const EditEndorsee = async (e) =>{
//         e.preventDefault()
//         const newEntry = {
//             fName:fName,
//             lName:lName,
//             email:email,
//             LinkTree:LinkTree,
//             username:username,
//         }
//         setAllentry([...allEntry, newEntry])
//         console.log(allEntry)
//         try{
//           // await axios.post('http://localhost:8000/InfluencerProfileShow', allEntry, {withCredentials: true});
//           await axios.post('http://localhost:8000/getInfluencerProfile', allEntry, {withCredentials: true});
//           navigate('/')
//         }
//         catch (err) {
//             console.log("ERROR")
//         }
//     }

//     const navigate = useNavigate()
//     const onClickHandler = () => {
//       navigate('/ChangePass')
//     }

//   return (
//     <div className="editep">
//       <div className='editeparea'>
//         <p className='editepmsg'>YOU CAN ONLY EDIT SELECTED FIELDS</p>
//         <h1 className='editeptitle'>Edit Profile</h1>
//         <form >
//           <label>
//             <input name='fname' id='fname' value={fName}  type="text" placeholder='First Name' className='editepinput1'/>
//           </label>
//           <label>
//             <input name='lname' id='lname' value={lName}  type="text" placeholder='Last Name' className='editepinput2'/>
//           </label>
//           <label>
//             <input name='email' id='email' value={email}  type="email" placeholder='Email' className='editepinput1'/>
//           </label>
//           <label>
//             <input name='DOB' id='DOB' value={DOB}  type="text" placeholder='Date of Birth' className='editepinput2'/>
//           </label>
//           <label>
//             <input value={username} onChange={(e)=>setUserName(e.target.value)} name='username' id='username' type="text" placeholder='Username' className='editepinputfull'/>
//           </label>
//           <label>
//             <input value={LinkTree} onChange={(e)=>setLinkTree(e.target.value)} name='LinkTree' id='LinkTree' type="text" placeholder='LinkTree Link' className='editepinputfull'/>
//           </label>
//         </form>
//         <button className='editepbuttons' onClick = {EditEndorsee}>Confirm Changes</button>
//         <button className='editepbuttons' onClick = {onClickHandler}>Change Password</button>
//       </div>
//     </div>
//   );
// }

// export default EditEndorseeProfile;

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
      navigate('/ChangePass')
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

