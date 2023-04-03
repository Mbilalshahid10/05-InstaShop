const sanitize = require('mongo-sanitize')
const influencerModel = require('../../../server/database/Schema/Influencer')

async function deletetheInfluencer(req,res){
    deleteEmail = req.params.email
    console.log(deleteEmail)
    influencerModel.deleteOne({email:deleteEmail},function(err,obj){
        res.send(`user with ${deleteEmail} has been deleted`)
    })
}
module.exports = {deletetheInfluencer}