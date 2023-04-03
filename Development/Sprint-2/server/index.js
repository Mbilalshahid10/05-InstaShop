const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {authenticateUser} = require('./auth.js')
const {connect} = require('./util')
const uri = "mongodb+srv://bilal:sproj123@cluster0.efvzb9g.mongodb.net/InstaShop?retryWrites=true&w=majority"
connect(uri);

require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
// rest apis
const {login} = require('./rest_apis/login')
const {create_announcement} = require('./rest_apis/admin/createAnnouncement')
const {Signup} = require('./rest_apis/Signup')
const {changePasswordGeneral} = require('./rest_apis/changePasswordGeneral')
//Admin
// const {changePassword} = require('./rest_apis/admin/changePassword')
const{getAdminProfile} = require('./rest_apis/admin/adminProfile')
const{get_announcement} = require('./rest_apis/admin/getAnnouncement.js')
// const {getAnnouncements} = require('./rest_apis/getAnnouncements')

//Influencer
const{getInfluencerProfile} = require('./rest_apis/influencer/InfluencerProfile')
// Client
const {getclientProfile} = require('./rest_apis/client/clientProfile')
const {getAllInfluencers} = require('./rest_apis/client/viewInfluencers')
const {getPendingApprovals } = require('./rest_apis/client/viewpendingapprovals.js')
const {getCompletedOrders} = require('./rest_apis/client/completedorders.js')
const {updateAccept } = require('./rest_apis/client/changeacceptdb.js')
const {updateStatus } = require('./rest_apis/client/changeStatusToOngoing.js')
const {placeOrder } = require('./rest_apis/client/placeOrder.js')
const {findInfluencerByName} = require('./rest_apis/client/findInfluencer.js')
const {addOrder} = require('./rest_apis/client/addPastOrder.js')
// Rating
const {updateRating} = require('./rest_apis/client/updateRating.js')
const {updateRatingInfluencer} = require('./rest_apis/influencer/updateRatingInfluencer.js')

const{getRatingInf} = require('./rest_apis/client/getRatingInf.js')
const {getRating} = require('./rest_apis/influencer/getRating.js')
// const{sendRating} = require('./rest_apis/client/RatingSend.js')
const {sendRatingInfluencer} = require('./rest_apis/influencer/RatingsSendInfluencer.js')
const {sendRatingClient} = require('./rest_apis/client/RatingSendClient.js')
const {sendRecommendationsClient} = require('./rest_apis/client/sendRecommendationsClient.js')
//Order History
const {getClientHistory} = require('./rest_apis/client/clientHistory.js')
const {getAllClientHistory} = require('./rest_apis/client/getAllClients.js')
const {getAllInfluencerHistory} = require('./rest_apis/influencer/getAllInfluencers.js')
const {deletetheClient} = require('./rest_apis/client/deleteClient.js')
const {deletetheInfluencer} = require('./rest_apis/influencer/deleteInfluencer.js')
const {getInfluencerHistory} = require('./rest_apis/influencer/influencerHistory.js')
const {Ordercount} = require('./rest_apis/influencer/getOrder.js')
const {Ordercount2} = require('./rest_apis/client/getOrder2.js')
const{AdminOrder} = require('./rest_apis/admin/AdminOrder.js')

const{OngoingRejectAdmin} = require('./rest_apis/admin/OngoingOrderRejectAdmin.js')
const{Payment} = require('./rest_apis/paymentStripe.js')

const PORT = process.env.PORT || 8000

app.use(express.json())
// new addition stripe
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(cookieParser())
const corsConfig = {
    origin: true,
    credentials: true
}
app.use(cors(corsConfig))
app.options('*', cors(corsConfig));

///////// STRIPE //////////
app.post('/donate', async (req, res) => {
    const { token = {}, amount = 0 } = req.body; 
    if (!Object.keys(token).length || !amount) {
        res.status(400).json({ success: false });
    }
    const { id:customerId } = await stripe.customers.create({
        email: token.email,
        source: token.id, 
    }).catch(e => {
        console.log(e);
        return null; 
    })
    if (!customerId) {
        res.status(500).json({ success: false });
        return; 
    }
    const invoiceId = `${token.email}-${Math.random().toString()}-${Date.now().toString()}`;
    const charge = await stripe.charges.create({
        amount: amount * 100,
        currency: "USD",
        customer: customerId,
        receipt_email: token.email,
        description: "Donation",
    }, { idempotencyKey: invoiceId }).catch(e => {
        console.log(e);
        return null; 
    });
    if (!charge) {
        res.status(500).json({ success: false });
        return;
    };
    res.status(201).json({ success: true });
});

app.post('/paymentstripe', async (req, res) => {
    await Payment(req,res)
  });

  app.post('/login', async(req, res) => {
    await login(req, res)
})

app.post('/signup', async (req, res) => {
    await Signup(req, res)
})

app.post('/ChangePass', async (req, res) => {
    await changePasswordGeneral(req, res)
})

app.get('/getAnnouncements', (authenticateUser), async (req, res) => {
    await getAnnouncements(req, res)
})

// Admin
app.post('/create_announcement', (authenticateUser), async (req, res) => {
    await create_announcement(req, res)
})

app.post('/adminProfile' , (authenticateUser), async(req,res) =>{
    await  getAdminProfile(req, res)    
})

app.get('/get_announcement' , (authenticateUser , async(req,res)=>{
    await get_announcement(req,res)
}))

// Pending Approvals
app.get('/clientPendingapprovals', async(req,res) =>{
    await  getPendingApprovals(req, res)    
})

app.get('/influencerpendingapprovals' ,async(req,res) =>{
    await  getPendingApprovals(req, res)    
})

// Completed Orders
app.get('/clientCompletedorders',  async(req,res) =>{
    await  getCompletedOrders(req, res)    
})

app.get('/influencercompletedorders', async(req,res) =>{
    await  getCompletedOrders(req, res)    
})

//Order history
app.get('/clientHistory'  ,async(req,res)=>{
    await getClientHistory(req,res)
})
app.get('/allClients'  ,async(req,res)=>{
    await getAllClientHistory(req,res)
})
app.get('/allInfluencers'  ,async(req,res)=>{
    await getAllInfluencerHistory(req,res)
})
app.delete(`/Client/:email`,async(req,res)=>{
    await deletetheClient(req,res)
})
app.delete(`/Influencer/:email`,async(req,res)=>{
    await deletetheInfluencer(req,res)
})
app.get('/influencerHistory' , async(req,res)=>{
    await getInfluencerHistory(req,res)
})

app.get('/allInfProfiles',  async(req,res) => {
    await getAllInfluencers(req, res)
})
app.post('/changeAccepted',  async(req,res)=>{
    await updateAccept(req,res)
})
app.post('/changeStatus',  async(req,res)=>{
    await updateStatus(req,res)
})

app.post('/placeOrder',async(req,res)=>{
    await placeOrder(req,res)
})

app.post('/addOrder', async(req,res)=>{
    await addOrder(req,res)
})

app.get('/getOrder' , async(req,res)=>{
    await Ordercount(req,res)
})

app.get('/getOrder2' , async(req,res)=>{
    await Ordercount2(req,res)
})
// Rating Stars and Order marks
app.post('/RatingAccepted',async(req,res)=>{  //Order is marked true when updated status
    await updateRating(req,res)
})

app.post('/RatingAcceptedInfluencer', async(req,res)=>{
    await updateRatingInfluencer(req,res)
})

app.get('/GetRatingClient' , async(req,res)=>{
    await getRating(req,res)
})

app.get('GetRatingInfluencer' , async(req,res)=>{
    await getRatingInf(req,res)
})

app.post('/RatingsSendInfluencer', async(req,res)=>{
    await sendRatingInfluencer(req,res)
})

app.post('/RatingsSendClient', async(req,res)=>{
    await sendRatingClient(req,res)
})

app.post('/RecommendationstoClient', async(req,res)=>{
    await sendRecommendationsClient(req,res)
})

app.get('/AdminOrder',  async(req,res)=>{
    await AdminOrder(req,res)
})

app.post('/OngoingOrderAdminReject', async(req,res)=>{
    await OngoingRejectAdmin(req,res)
})

app.get('/searchInf', async(req,res) => {
    await findInfluencerByName(req, res)
})


app.post('/InfluencerProfile' , (authenticateUser) , async(req,res) =>{
    await  getInfluencerProfile(req, res)    
})

app.post('/clientProfile' , (authenticateUser) , async(req,res) =>{
        await  getclientProfile(req, res)    
    })
    
// general
app.get('/logout', (req, res) => {
    // console.log("Backend Logout")
    res.cookie('jwt', '', {maxAge:1})
    res.status(200).send()
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})