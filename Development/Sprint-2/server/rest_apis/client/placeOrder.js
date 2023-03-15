const sanitize = require('mongo-sanitize')
const {createOrder} = require('../../../server/database/Create/createOrder')
const orderModel = require('../../../server/database/Schema/Order')

async function placeOrder(req,res){
    try{
    const totalOrders = await orderModel.countDocuments({}).exec();
    const orderID = totalOrders + 1
    await createOrder(orderID, req.body.clientEmail, req.body.influencerEmail, req.body.price , req.body.ratingGivenClient , req.body.ratingGivenInfluencer)
    res.status(200).json(orderID) 
    }
    catch(err){
        console.log("idhar araha hai")
        console.log(err)
        res.status(400).send(err)
    }

}

module.exports = {placeOrder}