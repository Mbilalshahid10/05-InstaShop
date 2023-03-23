const sanitize = require('mongo-sanitize')
const Influencer = require('../../database/Schema/Influencer')
// async function getInfluencerProfile(req, res){
//     try{
//         if(req.body.role === 'influencer'){
//             const influencer = await Influencer.findOne({email: sanitize(req.body.email)})
//             const toSend = {
//                 role: influencer.role,
//                 name : `${influencer.name.first} ${influencer.name.last}`,
//                 email: influencer.email,
//                 username : influencer.username,
//                 dob: influencer.dob,
//                 profileLink:influencer.profileLink
//             }
//             res.status(200).json(toSend)
//         } else{
//             console.log("Profile from backend is not send for influencer")
//             res.status(401).send()
//         }
//     } catch(err) {
//         res.status(400).send(err)
//     }
// }
// module.exports = {getInfluencerProfile}


async function getInfluencerProfile(req, res){
    // console.log(req.body)
    try{
        if(req.body.role === 'influencer'){
            console.log('2')
            const influencer = await Influencer.find({email: req.body.e});
            console.log('det', influencer[0].role, `${influencer[0].name.first} ${influencer[0].name.last}`, influencer[0].email ,influencer[0].username)        
            const toSend = {
                role:influencer[0].role,
                first : influencer[0].name.first,
                last :influencer[0].name.last,  
                email:influencer[0].email ,
                username:influencer[0].username,
                dob : influencer[0].dob,
                profileLink : influencer[0].profileLink,
                niche: influencer[0].niche
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
module.exports = {getInfluencerProfile}

