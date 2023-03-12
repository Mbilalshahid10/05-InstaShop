const sanitize = require("mongo-sanitize")
const mongoose = require("mongoose")
const order = require('../../../server/database/Schema/Order')
// const Influencer = require('../../database/Schema/Influencer')
// const sanitize = require('mongo-sanitize')
// const Admin = require('../../database/Schema/Order')


const JobOfferAdmin =async(req,res)=>{
    // console.log('inside recommendations file')
    // console.log('res',  res)
    // console.log('req',req.body)
    try{
        // console.log("fetch details of all influencers in recommendation")
        const orders = await order.find();
        console.log(orders)
        // const orders_json = JSON.parse(JSON.stringify(orders))
        // console.log('orders in admin job offer server',orders_json)
        // let niche = []
        // for (let i = 0; i< client_orders_json.length;i++){
        //     // console.log(i, client_orders_json[i].influencerEmail)
        //     const influencer = await Influencer.find({email: client_orders_json[i].influencerEmail});
        //     const influencer_json = JSON.parse(JSON.stringify(influencer))
        //     console.log('infulencer,json', influencer_json)
        //     niche.push(influencer_json[0].niche)
        // }
        // console.log('client orders')
        // // console.log(niche)

        // let max_niche = mode(niche)
        // // console.log('max', max_niche)

        // const recommended_influencers = await Influencer.find({niche:max_niche});
        // console.log('recomend')
        // console.log(recommended_influencers)
    
        res.status(200).json(orders) 
    } catch(err) {
        res.status(400).send(err)
    }

}
module.exports = {JobOfferAdmin}