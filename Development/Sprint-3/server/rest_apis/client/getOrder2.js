const sanitize = require('mongo-sanitize')
const mongoose = require("mongoose")
const orderModel = require('../../../server/database/Schema/Order')
const client = require('../../../server/database/Schema/Client')

async function Ordercount2(req, res){
   try{
    console.log("print body here");
    console.log(req.body);
        const query = {"clientEmail": req.body.email};
        console.log("the query is here " , query)
        const rate = await client.find()
        console.log("Order Count is here !!!")
        console.log("Rate is :" , rate)
        res.status(200).json(rate) 
    } catch(err) {
            res.status(400).send(err)
        }
}
module.exports = {Ordercount2}
