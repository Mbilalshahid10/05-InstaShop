import React, { Component, useState } from "react";
import axios from 'axios';
import './Card.css'


const ProfileCards = (props) => {
    
    const [price, setPrice] = useState(0)

    const handleChange = (e) => {
        setPrice(e.target.value)
    }

    const placeOrder = async () => {
        console.log("In place Order")
        console.log("Props are: ", props)
        const orderDetails = {clientEmail: props.clientEmail, influencerEmail: props.influencerEmail, price: price};

        await axios.post("http://localhost:8000/placeOrder", orderDetails).then(res =>{
            console.log("now add it in order history of client")
            console.log("print the data here " , res.data)

        let addorder = axios.post('http://localhost:8000/addOrder' , orderDetails)

        })

        // let placeorder = await axios.post("http://localhost:8000/placeOrder",  orderDetails).then(response =>{
        // console.log("is the data printed here")
        // console.log(response.data)
        // let addorder = axios.post('http://localhost:8000/addOrder' , orderDetails)
        // })
    }
    
    return (
        <div className="card">
            <h1>Name: {props.name}</h1>
            <p className="title">Niche: {props.niche}</p>
            <p>Rating: {props.rating}</p>
            <input className="price" type="Number" value={price} onChange={handleChange}></input>
            <button onClick={placeOrder}>Place Order</button>
        </div>
    ); 
}

export default ProfileCards;

