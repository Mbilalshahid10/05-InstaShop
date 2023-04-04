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
        
   
   
        let newrate = await axios.get('http://localhost:8000/GetRatingClient' ,{withCredentials:true} ,ratedata)
        .then(response => {
            const data = response.data;
            var result = data.find(item => item.email === influencerEmail);
            const newrating = result.rating
            console.log("result is : " , newrating)
            console.log("client ne db se rating pickup karli")

            const orderdata = { email: influencerEmail}
            console.log("Order data :" ,orderdata)
            let Ordercount  = axios.get('http://localhost:8000/getOrder' , ratedata)
            .then(response => {
                const data2 = response.data;
                console.log(data2)
                console.log(" data of orders is displayed here : " , data2)
                var result2 = data2.find(item => item.email === influencerEmail);
                let newdata2 = result2.pastOrders
                let orderlength =newdata2.length;
                console.log("order length is " , orderlength)
                console.log("what is new data2 : " , newdata2)
                console.log("the length is " , newdata2.length)
                let updatedRating = (newrating*(orderlength-1)+myrating)/orderlength;
                var num3 = Number(updatedRating.toFixed(2));
                console.log("updated rating here is now " ,num3)
                const acceptData ={ email: influencerEmail,  myrating: num3}
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
            <div className='cco'>    
                <h2>Here are your Completed orders</h2>
                {
                    newpendlist.map((val,key)=>{
                        return(
                            <div>
                                <div className='clientCompletedOrderCard'>
                                    <p>Order ID: {JSON.parse(JSON.stringify(val,undefined,3)).orderID}</p>
                                    <p>Influencer Email: {JSON.parse(JSON.stringify(val,undefined,3)).influencerEmail}</p>
                                    <p>Price: PKR{JSON.parse(JSON.stringify(val,undefined,3)).price}</p>
                                    <p>Status: {JSON.parse(JSON.stringify(val,undefined,3)).status}</p>
                                    <br></br>
                                </div>
                                <div>
                                    <p>Please rate your experience:</p>
                                    <button className='ccoRatingButton' onClick={()=>sendRating(1 , val.influencerEmail , val.orderID)} type="radio" name="stars" value="1">1 </button>
                                    <button className='ccoRatingButton' onClick={()=>sendRating(2 , val.influencerEmail, val.orderID )} type="radio" name="stars" value="2">2 </button>
                                    <button className='ccoRatingButton' onClick={()=>sendRating(3 , val.influencerEmail,  val.orderID)} type="radio" name="stars" value="3">3 </button>
                                    <button className='ccoRatingButton' onClick={()=>sendRating(4 , val.influencerEmail ,  val.orderID)} type="radio" name="stars" value="4">4 </button>
                                    <button className='ccoRatingButton' onClick={()=>sendRating(5 , val.influencerEmail,  val.orderID)} type="radio" name="stars" value="5">5 </button>
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