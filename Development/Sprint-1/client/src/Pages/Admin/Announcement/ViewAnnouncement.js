import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const SendAnnouncement = ()=>{
    const location = useLocation()
    const [mapdata, setmap] = useState([])
    const [mapdata2, setmap2] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8000/get_announcement' , {withCredentials:true}).then(
            (res)=>{
                console.log("is any announcement coming here ")
                console.log(res.data)
                setmap(res.data)
            }).catch(
                err=>{console.log(err)}
            )
    },[])

    const myfunc = ()=>{
        mapdata.map((val,key)=>{
            {
                mapdata2[key] = val
            }
        })
    }
    myfunc()

    return(
        <div>
            <h2> </h2>
       {
            <div className='ipa'>
                <h2>Here are your sent Announcements Posted</h2>
                {
                    mapdata2.map((val,key)=>{
                        return(
                            <div className='clientJobOfferCard'>
                                <div>
                                    <p>Title : {JSON.parse(JSON.stringify(val,undefined,3)).title}</p>
                                    <p>Text Body : {JSON.parse(JSON.stringify(val,undefined,3)).body}</p>
                                    <p>Date Posted : {JSON.parse(JSON.stringify(val,undefined,3)).date}</p>
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
export default SendAnnouncement;