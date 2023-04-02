import React, { Component, useState  } from "react";
import axios from 'axios';
import './Card.css'
import {useNavigate, useLocation} from 'react-router-dom';

const ProfileCards = (props) => {
    
    const location = useLocation()
    
    const e = location.state.email
    const r = location.state.role
    


    const [price, setPrice] = useState(0)
    const handleChange = (e) => {
        setPrice(e.target.value)
    }
    const navigate = useNavigate()
    const placeOrder = () =>{
        navigate('/sendOrder',   {state:{ role:r , clientEmail:props.clientEmail, influencerEmail: props.influencerEmail}})
    }

    return (
        <div className="card">
        <h1>{props.name}</h1>
        <p>Niche: {props.niche}</p>
        <p>Rating: {props.rating.toFixed(2)}/5</p>
        <button onClick={placeOrder}>Place Order</button>
        </div>
    ); 
}

export default ProfileCards;

