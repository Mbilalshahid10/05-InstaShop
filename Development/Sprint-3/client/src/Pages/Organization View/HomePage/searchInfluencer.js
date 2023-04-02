import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import './searchInfluencer.css'

const SearchInfluencerByName = ()=>{
    const [fname,setFname] = useState("")
    const [lname,setLname] = useState("")
    const [email,setEmail] = useState("")
    const [profileLink,setProfileLink] = useState("")
    const [niche,setNiche] = useState("")
    const [rating,setRating] = useState("")
    const location = useLocation()
    const firstName = location.state.firstName
    const newData = {firstName:firstName}
    useEffect(()=>{
        axios.get("http://localhost:8000/searchInf", newData).then(response=>{
        let data = response.data
        console.log("is it searching")
        // console.log(response.data)
        var result = data.find(item => item.name.first === firstName);
        console.log(result)
        setFname(result.name.first)
        setLname(result.name.last)
        setEmail(result.email)
        setProfileLink(result.profileLink)
        setNiche(result.niche)
        setRating(result.rating)
        
        }).catch(error=>{
        console.log(error)
        })
    },[])
    return(
        <div className='card2'>
            <div>
                <p className='title'>First Name: {fname}</p>
                <p className='title'>Last Name: {lname}</p>
                <p className='title'>Email: {email}</p>
                <p className='title'>Profile Link: {profileLink}</p>
                <p className='title'>Niche: {niche}</p>
                <p className='title'>Rating: {rating}</p>
            </div>
        </div>
    )
}
export default SearchInfluencerByName