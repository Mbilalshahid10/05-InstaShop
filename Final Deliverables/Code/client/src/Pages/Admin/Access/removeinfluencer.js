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
        axios.get("https://colleeasy.herokuapp.com/AdminOrder").then(
            (res)=>{
                // console.log('orders in admin client side', res.data)
                setpendinglist(res.data)
            }

            ).catch(
                err=>{console.log(err)}
            )
    },[])

    const myfunc = ()=>{
        pendinglist.map((val,key)=>{
            if(val.status === "Completed" && val.acceptedByClient === true){
                newpendlist[key] = val
            }
        })

    }
    myfunc()

    // const setStatus1 = async(myID)=>{
    //     const acceptData = {ans:"Ongoing", email:email, myID:myID}
    //     // console.log(acceptData)
    //     await axios.post("https://colleeasy.herokuapp.com/changeStatus",acceptData)

    // }

    // const setStatus2 = async(myID)=>{
    //     const acceptData = {ans:"Rejected", email:email, myID:myID}
    //     // console.log(acceptData)
    //     await axios.post("https://colleeasy.herokuapp.com/changeStatus",acceptData)
    // }
    
    return(
        <div>
        {
            <div className='ipa'>
                <h2>Here are the Orders History</h2>
                {
                    newpendlist.map((val,key)=>{
                        return(
                            <div className='AdminCard'>
                                <div>
                                    <p>Order ID: {JSON.parse(JSON.stringify(val,undefined,3)).orderID}</p>
                                    <p>Client Email: {JSON.parse(JSON.stringify(val,undefined,3)).clientEmail}</p>
                                    <p>Influencer Email: {JSON.parse(JSON.stringify(val,undefined,3)).influencerEmail}</p>
                                    <p>Price: PKR{JSON.parse(JSON.stringify(val,undefined,3)).price}</p>
                                    <p>Status: {JSON.parse(JSON.stringify(val,undefined,3)).status}</p>
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