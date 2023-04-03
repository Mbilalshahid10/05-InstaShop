import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
// import './AdminOrderHistory.css'

import axios from 'axios'
import { useState } from 'react'

const RemoveInfluencer = ()=>{
    const location = useLocation()
        // e.preventDefault();
    const [pendinglist,setpendinglist] = useState([])
    const [newpendlist, setnewpendlist] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:8000/allInfluencers").then(
            (res)=>{
                // console.log('orders in admin client side', res.data)
                console.log("sare influencer yaha rah hai")
                console.log(res.data)
                setpendinglist(res.data)
            }

            ).catch(
                err=>{console.log(err)}
            )
    },[])

    // const myfunc = ()=>{
    //     pendinglist.map((val,key)=>{
    //         if(val.status === "Completed" && val.acceptedByClient === true){
    //             newpendlist[key] = val
    //         }
    //     })

    // }
    // myfunc()

    // const setStatus1 = async(myID)=>{
    //     const acceptData = {ans:"Ongoing", email:email, myID:myID}
    //     // console.log(acceptData)
    //     await axios.post("http://localhost:8000/changeStatus",acceptData)

    // }

    // const setStatus2 = async(myID)=>{
    //     const acceptData = {ans:"Rejected", email:email, myID:myID}
    //     // console.log(acceptData)
    //     await axios.post("http://localhost:8000/changeStatus",acceptData)
    // }
    const deleteInfluencerByEmail = async(email)=>{
        try{
            const response = await axios.delete(`http://localhost:8000/Influencer/${email}`);
            console.log(response.data)
        }catch(error){
            console.log(error)
        }
    }
    
    return(
        <div>
        {
            <div className='ipa'>
                <h2>Here are the list of all influencers</h2>
                {
                    pendinglist.map((val,key)=>{
                        return(
                            <div className='AdminCard'>
                                <div>
                                <p>Influencer Name: {JSON.parse(JSON.stringify(val,undefined,3)).name.first}</p>
                                <p>Influencer Niche: {JSON.parse(JSON.stringify(val,undefined,3)).niche}</p>
                                <p>Influencer Email{JSON.parse(JSON.stringify(val,undefined,3)).email}</p>
                                <p>Influencer Rating {JSON.parse(JSON.stringify(val,undefined,3)).rating}</p>
                                <button onClick={()=>deleteInfluencerByEmail(JSON.parse(JSON.stringify(val,undefined,3)).email)} >Remove</button>
                                </div>

                                {/* <button onClick={()=>{setStatus1(val.orderID)}}>Accept</button> 
                                <button onClick={()=>{setStatus2(val.orderID)}}>Reject</button> */}
                            </div>
                        )
                    })
                }
            </div>
        }
        </div>
    )
}


export default RemoveInfluencer;