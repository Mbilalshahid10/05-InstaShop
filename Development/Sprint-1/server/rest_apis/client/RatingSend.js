const sanitize = require("mongo-sanitize")
const mongoose = require("mongoose")

const sendRating =async(req,res)=>{
    // console.log(req.body)
    try{

        const result = await mongoose.connection.db.collection('clients').findOneAndUpdate({"email":req.body.email},{
            $set:{
                "rating" : req.body.ans
            }
        })
        // console.log(result)
    }catch(err){
        console.log(err)
    }
}
module.exports = {sendRating}