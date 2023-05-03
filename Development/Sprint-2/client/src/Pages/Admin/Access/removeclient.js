import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
// import './AdminOrderHistory.css'
import axios from 'axios'
import { useState } from 'react'
const RemoveClient = ()=>{

    const location = useLocation()

        // e.preventDefault();
    const [pendinglist,setpendinglist] = useState([])
    const [newpendlist, setnewpendlist] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:8000/AdminOrder").then(
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

    const deleteClientByEmail = async(email)=>{
        try{
            const response = await axios.delete(`http://localhost:8000/Client/${email}`);
            console.log(response.data)
        }catch(error){
            console.log(error)
        }
    }
    
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
                                    <button onClick={()=>deleteClientByEmail(JSON.parse(JSON.stringify(val,undefined,3)).email)} >Remove</button>
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


export default RemoveClient;