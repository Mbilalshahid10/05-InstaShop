const sanitize = require('mongo-sanitize')
const mongoose = require("mongoose")
const influencer = require('../../../server/database/Schema/Influencer')

async function getRating(req, res){
    try{
        console.log("fetch details of rating")
        const rate = await influencer.find()
        console.log("Rating is Displayed")
        res.status(200).json(rate) 
    } catch(err) {
        res.status(400).send(err)
    }
}
module.exports = {getRating}
