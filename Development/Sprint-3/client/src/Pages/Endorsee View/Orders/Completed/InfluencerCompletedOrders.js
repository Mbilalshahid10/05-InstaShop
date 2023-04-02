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

    const sendRating2 = async(myrating, clientEmail , myID)=>{
        const ratingOrder = {email:clientEmail , myrating :myrating , myID:myID}
        console.log(ratingOrder)
        let request1 =  axios.post("http://localhost:8000/RatingAcceptedInfluencer",ratingOrder)
        const acceptData = {email:clientEmail , myrating :myrating , myID:myID}

        console.log("rating set done")
        console.log(acceptData)

        let newrate = await axios.get('http://localhost:8000/GetRatingInfluencer' ,{withCredentials:true} ,acceptData)
        .then(response => {
            const data = response.data;
            var result = data.find(item => item.email === clientEmail);
            const newrating = result.rating
            
            const orderdata = { email: clientEmail}
            console.log("Order data :" ,orderdata)

            let Ordercount = axios.get('http://localhost:8000/getOrder2' , acceptData).then(
                response=>{
                const data2 = response.data;
                console.log(data2)
                var result2 = data2.find(item => item.email === clientEmail);
                let newdata2 = result2.pastOrders
                let orderlength =newdata2.length;
                console.log("order length is " , orderlength)
                console.log("what is new data2 : " , newdata2)

                let updatedRating = (newrating*(orderlength-1)+myrating)/orderlength;
                var num3 = Number(updatedRating.toFixed(2));
                console.log("updated rating here is now " ,num3)
                const acceptData ={ email: clientEmail,  myrating: num3}
                //3rd query
                let request2 =  axios.post("http://localhost:8000/RatingsSendClient" , acceptData);
            })
        }).catch(error=>{
            console.log(error);
        })
        // let request2 =  axios.post("http://localhost:8000/RatingsSendClient" , acceptData);
        // // axios.all([request2])
        // axios.all([request1,request2])
        // console.log("finished axios.all method")
}
    return(
        <div>
        {
            <div className='ico'>
                <h2>Here are your Completed orders</h2>
                {
                    newpendlist.map((val,key)=>{
                        return(
                            <div >
                                <div className='influencercompletedordercard'>
                                    <p>Order ID: {JSON.parse(JSON.stringify(val,undefined,3)).orderID}</p>
                                    <p>Client Email: {JSON.parse(JSON.stringify(val,undefined,3)).clientEmail}</p>
                                    <p>Price: PKR{JSON.parse(JSON.stringify(val,undefined,3)).price}</p>
                                    <p>Status: {JSON.parse(JSON.stringify(val,undefined,3)).status}</p>
                                    <br></br>
                                </div>
                                <div>                                             <p>Please rate your experience:</p>
                                    <button className='ccoRatingButton' onClick={()=>sendRating2(1 , val.clientEmail,  val.orderID)} type="radio" name="stars" value="1">1 </button>
                                    <button className='ccoRatingButton' onClick={()=>sendRating2(2 , val.clientEmail,  val.orderID)} type="radio" name="stars" value="2">2 </button>
                                    <button className='ccoRatingButton' onClick={()=>sendRating2(3 , val.clientEmail,  val.orderID)} type="radio" name="stars" value="3">3 </button>
                                    <button className='ccoRatingButton' onClick={()=>sendRating2(4 , val.clientEmail,  val.orderID)} type="radio" name="stars" value="4">4 </button>
                                    <button className='ccoRatingButton' onClick={()=>sendRating2(5 , val.clientEmail,  val.orderID)} type="radio" name="stars" value="5">5 </button>
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