const {createAnnouncement} = require('../../database/Create/createAnnouncement')
const sanitize = require("mongo-sanitize")
const announcement = require('../../../server/database/Schema/Announcement')

async function create_announcement(req, res){
    try{
        // if(res.role === 'Admin'){
            console.log("is it an admin")
            const body = sanitize(req.body.body)
            const title = sanitize(req.body.title)
            const result = await createAnnouncement(body, title)
            res.status(200).json(result)
            // res.status(200).json({
            //     msg: 'Annoucement successfully made!',
            //     announcement: {
            //         title: title,
            //         body: body,
            //         date: new Date()
            //     }
            // })
        //  }
    } catch(err) {
        console.log("ya phir error deraha hai ")
        res.status(400).send(err)
    }
}

module.exports = {create_announcement}