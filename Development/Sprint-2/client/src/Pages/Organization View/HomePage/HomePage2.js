import React, { useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import './HomePage.css'
import ProfileCards from './Card.js'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const HomePage2 = ()=>{  
  const navigate = useNavigate()
  const location = useLocation()
  const [first, setFirst] = useState("")
  const OrderHistory = ()=>{
    if (location.state.role === "Admin"){
      navigate('/AdminOrderHistory', {state:{role:location.state.role,email:location.state.email,pwd:location.state.pwd}})
    }
  }
  const searchInfluencer = ()=>{
    const newData = {firstName: first}
    navigate('/searchInf',{state:{firstName:first}})
  }
  return (
    <div className="homepage">
    <div className='homepagearea'>
      <p className='homepagemsg'>Admin Dashboard</p>
      <h1 className='homepagetitle'>Admin Search</h1>
      <form>
        <label>
        <input type="text" placeholder="Enter Endorsee's first Name" className='homepageinput1' value={first} onChange={(e)=>setFirst(e.target.value)}/>
        </label>
      </form>
      <button onClick={searchInfluencer} className='homepagebuttons' type='submit'>Search</button>
    </div>    
    <div className='tabsContainer'>
        <button className='orderTabs' onClick={OrderHistory}>Admin Order History</button>
    </div>
  </div>
    
  );
}
export default HomePage2;