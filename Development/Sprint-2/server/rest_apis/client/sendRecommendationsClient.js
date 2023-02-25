const sanitize = require("mongo-sanitize")
const mongoose = require("mongoose")
const orderModel = require('../../../server/database/Schema/Order')
const Influencer = require('../../database/Schema/Influencer')


function mode(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
}


const sendRecommendationsClient =async(req,res)=>{
    console.log('inside recommendations file')
    // console.log('res',  res)
    console.log('req',req.body)
    try{
        // console.log("fetch details of all influencers in recommendation")
        const client_orders = await orderModel.find({clientEmail: req.body.email});
        const client_orders_json = JSON.parse(JSON.stringify(client_orders))
        let niche = []
        for (let i = 0; i< client_orders_json.length;i++){
            // console.log(i, client_orders_json[i].influencerEmail)
            const influencer = await Influencer.find({email: client_orders_json[i].influencerEmail});
            const influencer_json = JSON.parse(JSON.stringify(influencer))
            console.log('infulencer,json', influencer_json)
            niche.push(influencer_json[0].niche)
        }
        console.log('client orders')
        // console.log(niche)

        let max_niche = mode(niche)
        // console.log('max', max_niche)

        const recommended_influencers = await Influencer.find({niche:max_niche});
        console.log('recomend')
        console.log(recommended_influencers)
    
        res.status(200).json(recommended_influencers) 
    } catch(err) {
        res.status(400).send(err)
    }

}
module.exports = {sendRecommendationsClient}