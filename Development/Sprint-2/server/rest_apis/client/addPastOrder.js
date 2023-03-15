const sanitize = require('mongo-sanitize')
const orderModel = require('../../../server/database/Schema/Order')
const client = require('../../../server/database/Schema/Client')
const { default: mongoose } = require('mongoose')

async function addOrder(req,res){
    console.log(req.body)
    try{
        const add = await mongoose.connection.db.collection('clients').updateOne
        ({"email": req.body.uniqEmail}, {
            $push:{pastOrders: req.body.myID}
        })
        console.log("shapato")
    }
    catch(err){
        console.log("order is not added");
        console.log(err)
    }
    

    // orderModel.find({},(err,result)=>{
    //     if(err){
    //         res.send(err)
    //     }
    //     res.send(result)
    //     console.log(result)
    // })
}
module.exports = {addOrder}