const sanitize = require('mongo-sanitize')
const clientModel = require('../../../server/database/Schema/Client')

async function deletetheClient(req,res){
    deleteEmail = req.params.email
    console.log(deleteEmail)
    clientModel.deleteOne({email:deleteEmail},function(err,obj){
        res.send(`user with ${deleteEmail} has been deleted`)
    })
}
module.exports = {deletetheClient}