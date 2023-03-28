const sanitize = require("mongo-sanitize")
const mongoose = require("mongoose")
const order = require('../../database/Schema/Order')
// const Influencer = require('../../database/Schema/Influencer')
// const sanitize = require('mongo-sanitize')
// const Admin = require('../../database/Schema/Order')

const AdminOrder =async(req,res)=>{
    try{
        console.log("is the orders being passed")
        const orders = await order.find();
        console.log(orders)
        res.status(200).json(orders) 
    } catch(err) {
        console.log("its order error")
        res.status(400).send(err)
    }

}
module.exports = {AdminOrder}