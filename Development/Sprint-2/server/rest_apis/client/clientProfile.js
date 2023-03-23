const sanitize = require('mongo-sanitize')
const Client = require('../../database/Schema/Client')

async function getclientProfile(req, res){
    // console.log(req.body)
    try{
        if(req.body.role === 'client'){
            console.log('2')
            const client = await Client.find({email: req.body.e});
            const toSend = {
                role:client[0].role,
                name: client[0].name,  
                email:client[0].email ,
                category: client[0].category,
                country : client[0].country,
                zipcode : client[0].zipcode,
                address : client[0].address
            }
            console.log('tosend', toSend)
            res.status(200).json(toSend)
        } else{
            res.status(401).send()
        }
    } catch(err) {
        res.status(400).send(err)
    }
}
module.exports = {getclientProfile}

