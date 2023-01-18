import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './ClientCompletedOrders.css'
import axios from 'axios'
import { useState } from 'react'

const ClientCompleteOrderList = ()=>{
    const location = useLocation()
    const email = location.state.email
    const role = location.state.role

    // e.preventDefault();
    const [pendinglist,setpendinglist] = useState([])
    const [newpendlist, setnewpendlist] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:8000/clientCompletedorders").then(
            (res)=>{
                console.log(res.data)
                setpendinglist(res.data)
            }).catch(
                err=>{console.log(err)}
            )
    },[])

    const myfunc = ()=>{
        pendinglist.map((val,key)=>{
            if(val.clientEmail === email && val.status ==="Completed" && val.acceptedByClient === true){
                newpendlist[key] = val
            }
        })
    }
    myfunc()
 
    const sendRating = async(myrating, influencerEmail , myID)=>{
        const ratingOrder ={ email: influencerEmail,  myrating: myrating , myID:myID} 
        console.log(ratingOrder)
        let request1  =  axios.post("http://localhost:8000/RatingAccepted", ratingOrder)
    
        const ratedata = { email: influencerEmail,  myrating: myrating , myID:myID}
        console.log("check if old rating is fetched")
        // let ratenew = await axios.get("http://localhost:8000/GetRatingClient" , ratedata)
        console.log("Check if rating is coming from backend !!! ")
        // console.log(ratenew.rating)


        let newrate = await axios.get('http://localhost:8000/GetRatingClient' , ratedata)
        .then(response => {
            const data = response.data;
            var result = data.find(item => item.email === influencerEmail);
            const newrating = result.rating
            console.log("result is : " , newrating)
            console.log("client ne db se rating pickup karli")

            const orderdata = { email: influencerEmail}
            let Ordercount  = axios.get('http://localhost:8000/getOrder' , orderdata)
            .then(response => {
                const data = response.data;
                console.log(" data of orders is displayed here : " , data)
                // var count = data.find(item => item.influencerEmail === influencerEmail);
                // console.log("Which order is printed ab" ,  result)
                // result = count; //replace count function here just for total orders
                let updatedRating = (newrating+myrating)/2;
                console.log("updated rating here is now " ,updatedRating)
                const acceptData ={ email: influencerEmail,  myrating: updatedRating}
                //third query
                let request2 =  axios.post("http://localhost:8000/RatingsSendInfluencer" , acceptData);
            })
        }).catch(error => {
            console.log(error);
        });

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
                            <div className='clientCompletedOrderCard'>
                                <div>
                                    <p>Order ID: {JSON.parse(JSON.stringify(val,undefined,3)).orderID}</p>
                                    <p>Influencer Email: {JSON.parse(JSON.stringify(val,undefined,3)).influencerEmail}</p>
                                    <p>Price: PKR{JSON.parse(JSON.stringify(val,undefined,3)).price}</p>
                                    <p>Status: {JSON.parse(JSON.stringify(val,undefined,3)).status}</p>

                                    <br></br>
                                    <button onClick={()=>sendRating(1 , val.influencerEmail , val.orderID)} type="radio" name="stars" value="1">1 </button>
                                    <button onClick={()=>sendRating(2 , val.influencerEmail, val.orderID )} type="radio" name="stars" value="2">2 </button>
                                    <button onClick={()=>sendRating(3 , val.influencerEmail,  val.orderID)} type="radio" name="stars" value="3">3 </button>
                                    <button onClick={()=>sendRating(4 , val.influencerEmail ,  val.orderID)} type="radio" name="stars" value="4">4 </button>
                                    <button onClick={()=>sendRating(5 , val.influencerEmail,  val.orderID)} type="radio" name="stars" value="5">5 </button>

                                    {/* <button onClick={()=>{SetRatingClient(val.orderID , val.influencerEmail)}}>Click to Finish !!!</button> 
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
export default ClientCompleteOrderList;