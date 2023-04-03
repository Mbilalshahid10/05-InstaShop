const sanitize = require('mongo-sanitize')
const influencerModel = require('../../database/Schema/Influencer')

async function getAllInfluencerHistory(req,res){
    influencerModel.find({},(err,result)=>{
        if(err){
            res.send(err)
        }
        res.send(result)
        console.log(result)
    })
}
module.exports = {getAllInfluencerHistory}