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
        axios.get("http://localhost:8000/allClients").then(
            (res)=>{
                // console.log('orders in admin client side', res.data)
                console.log("sare clients yaha rah hai")
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
                <h2>Here are the list of all clients</h2>
                {
                    pendinglist.map((val,key)=>{
                        return(
                            <div className='AdminCard'>
                                <div>
                                    {/* <p>Order ID: {JSON.parse(JSON.stringify(val,undefined,3)).orderID}</p> */}
                                    <p>Client Name: {JSON.parse(JSON.stringify(val,undefined,3)).name}</p>
                                    <p>Client Category: {JSON.parse(JSON.stringify(val,undefined,3)).category}</p>
                                    <p>Client Email{JSON.parse(JSON.stringify(val,undefined,3)).email}</p>
                                    <p>Client Rating {JSON.parse(JSON.stringify(val,undefined,3)).rating}</p>
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