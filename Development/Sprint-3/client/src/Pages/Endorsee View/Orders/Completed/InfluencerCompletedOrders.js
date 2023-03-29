import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './InfluencerCompletedOrders.css'
import axios from 'axios'
import { useState } from 'react'

const InfluencerCompleteOrderList = ()=>{
    const location = useLocation()
    const email = location.state.email
    const role = location.state.role

        // e.preventDefault();
    const [pendinglist,setpendinglist] = useState([])
    const [newpendlist, setnewpendlist] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:8000/influencercompletedorders").then(
            (res)=>{
                console.log(res.data)
                setpendinglist(res.data)
            }).catch(
                err=>{console.log(err)}
            )
    },[])

    const myfunc = ()=>{
        pendinglist.map((val,key)=>{
            if(val.influencerEmail === email && val.status ==="Completed" && val.acceptedByClient === true){
                newpendlist[key] = val
            }
        })
    }
    myfunc()

    // const SetRatingInfluencer = async(myID ,ratingGivenClient)=>{
    //     // const acceptData = {ans:true, email:email, myID:myID } 
    //     const acceptData = { myID:myID , email:email,  ratingGivenClient : ratingGivenClient }
    //     console.log(acceptData)
    //     await axios.post("http://localhost:8000/RatingAcceptedInfluencer",acceptData)
    //     console.log(myID)
    // }
    const sendRating2 = async(myrating, clientEmail , myID)=>{
        // if(location.state.role ==="Influencer"){
        //     const acceptData ={ email: clientEmail,  myrating: myrating} 
        //     console.log(acceptData);
        //     await axios.post("http://localhost:8000/RatingsSendClient" , acceptData);
        // }
        const ratingOrder = {email:clientEmail , myrating :myrating , myID:myID}
        console.log(ratingOrder)
        let request1 =  axios.post("http://localhost:8000/RatingAcceptedInfluencer",ratingOrder)
        const acceptData = {email:clientEmail , myrating :myrating , myID:myID}
        console.log("rating set done")
        console.log(acceptData)
        let request2 =  axios.post("http://localhost:8000/RatingsSendClient" , acceptData);
        // axios.all([request2])
        axios.all([request1,request2])
        console.log("finished axios.all method")
}

    return(
        <div>
        {
            <div className='ico'>
                <h2>Here are your completed orders</h2>
                {
                    newpendlist.map((val,key)=>{
                        return(
                            <div className='influencercompletedordercard'>
                                <div>
                                    <p>Order ID: {JSON.parse(JSON.stringify(val,undefined,3)).orderID}</p>
                                    <p>Client Email: {JSON.parse(JSON.stringify(val,undefined,3)).clientEmail}</p>
                                    <p>Price: PKR{JSON.parse(JSON.stringify(val,undefined,3)).price}</p>
                                    <p>Status: {JSON.parse(JSON.stringify(val,undefined,3)).status}</p>

                                    {/* <br></br>
                                    <button onClick={()=>sendRating2(1 , val.clientEmail,  val.orderID)} type="radio" name="stars" value="1">1 </button>
                                    <button onClick={()=>sendRating2(2 , val.clientEmail,  val.orderID)} type="radio" name="stars" value="2">2 </button>
                                    <button onClick={()=>sendRating2(3 , val.clientEmail,  val.orderID)} type="radio" name="stars" value="3">3 </button>
                                    <button onClick={()=>sendRating2(4 , val.clientEmail,  val.orderID)} type="radio" name="stars" value="4">4 </button>
                                    <button onClick={()=>sendRating2(5 , val.clientEmail,  val.orderID)} type="radio" name="stars" value="5">5 </button> */}

                                    {/* <button onClick={()=>{SetRatingInfluencer(val.orderID,
                                    val.ratingGivenClient)}}>Click to Finish !!!</button> 
                                    <br></br> */}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        }
        </div>
    )
}
export default InfluencerCompleteOrderList;