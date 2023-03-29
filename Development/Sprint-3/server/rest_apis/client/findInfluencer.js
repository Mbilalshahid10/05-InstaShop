const sanitize = require('mongo-sanitize')
const mongoose = require("mongoose")

const Influencer = require('../../database/Schema/Influencer')

async function findInfluencerByName(req, res){
    try{
        console.log("fetch details of influencer")
        const influencerSearch = await Influencer.find()
        console.log(influencerSearch)
        res.status(200).json(influencerSearch)
    } catch(err) {
        res.status(400).send(err)
    }
}
module.exports = {findInfluencerByName}

