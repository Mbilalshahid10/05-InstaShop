const sanitize = require('mongo-sanitize')
const Admin = require('../../database/Schema/Admin')

async function getAdminProfile(req, res){
    // console.log(req.body)
    try{
        console.log('1', req.body)
        if(req.body.role === 'admin'){
            console.log('2')
            const admin = await Admin.find({email: req.body.e});
            console.log('admin', admin)   
            console.log('det', admin[0].role, `${admin[0].name.first} ${admin[0].name.last}`, admin[0].email ,admin[0].username)        
            const toSend = {
                role:admin[0].role,
                first : admin[0].name.first,
                last :admin[0].name.last,  
                email:admin[0].email ,
                username:admin[0].username
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
module.exports = {getAdminProfile}