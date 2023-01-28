const sanitize = require('mongo-sanitize')
const mongoose = require("mongoose")
const orderModel = require('../../../server/database/Schema/Order')
// const orderModel = require('../../database/Schema/Order')
const influencer = require('../../../server/database/Schema/Influencer')

async function Ordercount(req, res){
   try{
    console.log("print body here");
    console.log(req.body);
        const query = {"influencerEmail": req.body.email};
        console.log("the query is here " , query)
        // const rate = await orderModel.find({"influencerEmail":req.body.email}).countDocuments({}).exec()
        // const rate = await orderModel.find()
        const rate = await influencer.find()

        console.log("Order Count is here !!!")
        console.log("Rate is :" , rate)
        res.status(200).json(rate) 
    } catch(err) {
            res.status(400).send(err)
        }
}
module.exports = {Ordercount}
