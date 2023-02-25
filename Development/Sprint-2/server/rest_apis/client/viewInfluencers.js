const sanitize = require('mongo-sanitize')
const mongoose = require("mongoose")

const Influencer = require('../../database/Schema/Influencer')

const Order = require('../../database/Schema/Order')

async function getAllInfluencers(req, res){
    try{
        // console.log("fetch details of all influencers")
        const infProfiles = await Influencer.find()
        // console.log(infProfiles)
    
        res.status(200).json(infProfiles) 
    } catch(err) {
        res.status(400).send(err)
    }
}
module.exports = {getAllInfluencers}