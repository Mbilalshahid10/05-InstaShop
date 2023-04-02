const sanitize = require('mongo-sanitize')
const mongoose = require("mongoose")
const client = require('../../../server/database/Schema/Client')

async function getRatingInf(req, res){
    try{
        console.log("fetch details of rating")
        const rate = await client.find()
        console.log("Rating is Displayed")
        res.status(200).json(rate) 
    } catch(err) {
        res.status(400).send(err)
    }
}
module.exports = {getRatingInf}
