const sanitize = require('mongo-sanitize')
const mongoose = require("mongoose")
const orderModel = require('../../../server/database/Schema/Order')

async function Ordercount(req, res){

   try{
    console.log("print body here");
    console.log(req.body);
        const query = { "influencerEmail": req.body.email};
        console.log("the query is here " , query)
        // const rate = await orderModel.find().countDocuments(query)
        const rate = await orderModel.find().countDocuments({})
        console.log("Order is Displayed here !!!!!!!")
        console.log("Rate is :" , rate)
        res.status(200).json(rate) 
    } catch(err) {
            res.status(400).send(err)
        }
}
module.exports = {Ordercount}
