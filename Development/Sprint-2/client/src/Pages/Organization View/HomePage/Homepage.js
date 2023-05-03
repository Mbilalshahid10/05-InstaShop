import React, { useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import './HomePage.css'
import ProfileCards from './Card.js'
import {useNavigate} from 'react-router-dom';

import axios from 'axios';

const HomePage = ()=>{
  
  const navigate = useNavigate()
  const location = useLocation()
  const [allProfiles, setAllProfiles] = useState([])
  const [first, setFirst] = useState("")
  const role = location.state.role
  const [recProfiles, setRecProfiles] = useState([])
  
  useEffect( () => {
    if (role === "Client"){
      axios.get('http://localhost:8000/allInfProfiles', {withCredentials: true})
      .then(response => response.data)
      .then(data => {
        // console.log(data)
        const temp = data.slice(0,5)
        const profiles = temp.map(profile => {
          return (
            <div className='cardcontainer'>
              <ProfileCards 
              name = {profile.name.first}
              niche = {profile.niche}
              rating = {profile.rating}
              clientEmail = {location.state.email}
              influencerEmail = {profile.email}
              />
          </div>
          )
        })
        setAllProfiles(profiles)
      })
    }
  }, [])    
  
  const client_email = {email: location.state.email}

  useEffect( () => {
    if (role === "Client"){
      axios.post('http://localhost:8000/RecommendationstoClient', client_email ,{withCredentials: true})
      .then(response => response.data)
      .then(data => {
        console.log(data)
        const temp = data.slice(0,5)
        const profiles = temp.map(profile => {
          return (
            <div className='cardcontainer'>
              <ProfileCards
                name = {profile.name.first}
                niche = {profile.niche}
                rating = {profile.rating}
                clientEmail = {location.state.email}
                influencerEmail = {profile.email}
              />
          </div>
          )
        })
        setRecProfiles(profiles)
      })
    }
  }, [])    
  

  const jobOffers = () => {
    if(location.state.role === "Client"){
      navigate('/clientJobOffers', {state:{role:location.state.role,email:location.state.email,pwd:location.state.pwd}})
    }
    else if (location.state.role === "Influencer"){
      navigate('/influencerJobOffers', {state:{role:location.state.role,email:location.state.email,pwd:location.state.pwd}}) 
    }
  }

  const ongoingOrders = () => {
    if(location.state.role === "Client"){
      navigate('/clientOngoingOrders', {state:{role:location.state.role,email:location.state.email,pwd:location.state.pwd}})
    }
    else if (location.state.role === "Influencer"){
      navigate('/influencerOngoingOrders', {state:{role:location.state.role,email:location.state.email,pwd:location.state.pwd}})
    }
  }

  const rejectedOrders = () => {
    if(location.state.role === "Client"){
      navigate('/clientRejectedOrders', {state:{role:location.state.role,email:location.state.email,pwd:location.state.pwd}})
    }
    else if (location.state.role === "Influencer"){
      navigate('/influencerRejectedOrders', {state:{role:location.state.role,email:location.state.email,pwd:location.state.pwd}})

    }
  }

  const topending = () => {
    if(location.state.role === "Client"){
      navigate('/clientPendingapprovals', {state:{role:location.state.role,email:location.state.email,pwd:location.state.pwd}})
    }
    else if(location.state.role === "Influencer"){
      navigate('/influencerPendingApprovals', {state:{role:location.state.role,email:location.state.email,pwd:location.state.pwd}})
    }
  }
  const toComplete = ()=>{
    if(location.state.role === "Client"){
      navigate('/clientCompletedorders', {state:{role:location.state.role,email:location.state.email,pwd:location.state.pwd}})
    }
    else if(location.state.role === "Influencer"){
      navigate('/influencerCompletedOrders', {state:{role:location.state.role,email:location.state.email,pwd:location.state.pwd}})
    }
  }

  const OrderHistory = ()=>{
    if(location.state.role === "Client"){
      navigate('/clientHistory', {state:{role:location.state.role,email:location.state.email,pwd:location.state.pwd}})
    }
    else if(location.state.role === "Influencer"){
      navigate('/influencerHistory', {state:{role:location.state.role,email:location.state.email,pwd:location.state.pwd}})
    }
    else if (location.state.role === "Admin"){
      navigate('/AdminOrderHistory', {state:{role:location.state.role,email:location.state.email,pwd:location.state.pwd}})

    }
  }
  const searchInfluencer = ()=>{
    const newData = {firstName: first}
    navigate('/searchInf',{state:{firstName:first , role :location.state.role , email:location.state.email}})
  }

  return (
    <div className="homepage">
    <div className='homepagearea'>
      <p className='homepagemsg'>MAKE SURE YOU ENTER THE EXACT NAME</p>
      <h1 className='homepagetitle'>Find An Endorsee</h1>
      <form>
        <label>
        <input type="text" placeholder="Enter Endorsee's first Name" className='homepageinput1' value={first} onChange={(e)=>setFirst(e.target.value)}/>
        </label>
      </form>
      <button onClick={searchInfluencer} className='homepagebuttons' type='submit'>Search</button>
    </div>
    
    <div className='tabsContainer'>
      <h1 className='rec'>Find Your Orders</h1>
        <button className='orderTabs' onClick={jobOffers}>Job Offers</button>
        <button className='orderTabs' onClick={ongoingOrders}>Ongoing Orders</button>
        <button className='orderTabs' onClick={topending}>Pending approvals</button>
        <button className='orderTabs' onClick={toComplete}>Completed Orders</button>
        <button className='orderTabs' onClick={rejectedOrders}>Rejected Orders</button>
        <button className='orderTabs' onClick={OrderHistory}>Order History</button>
    </div>

    <h1 className='rec'>Recommended For You</h1>
    <div className='recscontainer'>
      <div className='cardcontainer'>
        {recProfiles}
      </div>
    </div>

    <h1 className='rec'>All Influencers</h1>
    <div className='cardcontainer'>
      {allProfiles}
    </div>
  </div>
    
  );
}
export default HomePage;