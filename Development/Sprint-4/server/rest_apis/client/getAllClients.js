const sanitize = require('mongo-sanitize')
const clientModel = require('../../../server/database/Schema/Client')

async function getAllClientHistory(req,res){
    clientModel.find({},(err,result)=>{
        if(err){
            res.send(err)
        }
        res.send(result)
        console.log(result)
    })
}
module.exports = {getAllClientHistory}