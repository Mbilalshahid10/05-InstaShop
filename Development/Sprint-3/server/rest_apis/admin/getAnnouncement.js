const sanitize = require("mongo-sanitize")
const Annoucement = require('../../database/Schema/Announcement')

async function get_announcement(req, res){
    try{
        // if(res.role === 'Admin'){
            console.log("fetch all the announcements made !!!")
            const result = await Annoucement.find() 
            res.status(200).json(result)
            console.log("All announcements sent")
        // }      
    } catch(err) {
        res.status(400).send(err)
    }
}

module.exports = {get_announcement}