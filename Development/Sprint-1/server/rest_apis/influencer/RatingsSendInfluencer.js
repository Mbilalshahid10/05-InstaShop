const sanitize = require("mongo-sanitize")
const mongoose = require("mongoose")

const sendRatingInfluencer =async(req,res)=>{
    console.log(req.body)
    try{

        const result = await mongoose.connection.db.collection('influencers').findOneAndUpdate({"rating":req.body.myrating},{
            $set:{
                rating : req.body.myrating
            }
        })
        console.log(result)
    }catch(err){
        console.log(err)
    }
}
module.exports = {sendRatingInfluencer}