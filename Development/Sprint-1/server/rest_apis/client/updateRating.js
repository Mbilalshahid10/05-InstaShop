const sanitize = require("mongo-sanitize")
const mongoose = require("mongoose")

const updateRating = async(req,res)=>{
    // console.log(req.body)
    try{
        const result = await mongoose.connection.db.collection('orders').findOneAndUpdate({"orderID":req.body.myID},{
            $set:{
                // "ratingGiven":req.body.ans
                // "ratingGivenInfluencer": req.body.ans
                "ratingGivenInfluencer": req.body.myrating
            }
        })
        // console.log(result)

    }catch(err){
        console.log(err)
    }
}
module.exports = {updateRating}