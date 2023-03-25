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

// stripe payment Routes
const stripe = require('stripe')('sk_test_51MpBtqAF4ik8eFskBXY4Cyhp1iggT1dpTq0tE7wekVAcLCKKmAe6o2IQs7WWsZksN8xXeyXV6Yt2yCLtZqZAguWX00H5NdtsAZ');


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

const {getRating} = require('./rest_apis/influencer/getRating.js')
// const{sendRating} = require('./rest_apis/client/RatingSend.js')
const {sendRatingInfluencer} = require('./rest_apis/influencer/RatingsSendInfluencer.js')
const {sendRatingClient} = require('./rest_apis/client/RatingSendClient.js')
const {sendRecommendationsClient} = require('./rest_apis/client/sendRecommendationsClient.js')
//Order History
const {getClientHistory} = require('./rest_apis/client/clientHistory.js')
const {getInfluencerHistory} = require('./rest_apis/influencer/influencerHistory.js')
const {Ordercount} = require('./rest_apis/influencer/getOrder.js')

const{AdminOrder} = require('./rest_apis/admin/AdminOrder.js')

const{OngoingRejectAdmin} = require('./rest_apis/admin/OngoingOrderRejectAdmin.js')

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

// Stripe
app.post('/stripe', async (req, res) => {
    //user sends price along with request
    const userPrice = parseInt(req.body.price)*100;
    //create a payment intent
    const intent = await stripe.paymentIntents.create({
      //use the specified price
      amount: userPrice,
      currency: 'usd'
    });
      //respond with the client secret and id of the new paymentintent
  res.json({client_secret: intent.client_secret, intent_id:intent.id});
});

//handle payment confirmations
app.post('/confirm-payment',  async (req, res) => {
    //extract payment type from the client request
    const paymentType = String(req.body.payment_type);
    //handle confirmed stripe transaction
    if (paymentType == "stripe") {
      //get payment id for stripe
      const clientid = String(req.body.payment_id);
      //get the transaction based on the provided id
      stripe.paymentIntents.retrieve(
        clientid,
        function(err, paymentIntent) {
          //handle errors
          if (err){
            console.log(err);
          }
          //respond to the client that the server confirmed the transaction
          if (paymentIntent.status === 'succeeded') {
            /*YOUR CODE HERE*/  
                  console.log("confirmed stripe payment: " + clientid);
            res.json({success: true});
          } else {
            res.json({success: false});
          }
        }
      );
    } 
  })

/////////////////////////////////////////////////////////////////////

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
app.get('/clientPendingapprovals', (authenticateUser), async(req,res) =>{
    await  getPendingApprovals(req, res)    
})

app.get('/influencerpendingapprovals', (authenticateUser) ,async(req,res) =>{
    await  getPendingApprovals(req, res)    
})

// Completed Orders
app.get('/clientCompletedorders', (authenticateUser), async(req,res) =>{
    await  getCompletedOrders(req, res)    
})

app.get('/influencercompletedorders',(authenticateUser) , async(req,res) =>{
    await  getCompletedOrders(req, res)    
})

//Order history
app.get('/clientHistory' , (authenticateUser) ,async(req,res)=>{
    await getClientHistory(req,res)
})

app.get('/influencerHistory',(authenticateUser) , async(req,res)=>{
    await getInfluencerHistory(req,res)
})


app.get('/allInfProfiles', (authenticateUser), async(req,res) => {
    await getAllInfluencers(req, res)
})
app.post('/changeAccepted', (authenticateUser), async(req,res)=>{
    await updateAccept(req,res)
})
app.post('/changeStatus', (authenticateUser), async(req,res)=>{
    await updateStatus(req,res)
})

app.post('/placeOrder', (authenticateUser), async(req,res)=>{
    await placeOrder(req,res)
})

app.post('/addOrder', (authenticateUser), async(req,res)=>{
    await addOrder(req,res)
})

app.get('/getOrder' , (authenticateUser), async(req,res)=>{
    await Ordercount(req,res)
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

// app.post('/RatingsSend', async(req,res)=>{
//     await sendRating(req,res)
// })
app.post('/RatingsSendInfluencer', async(req,res)=>{
    await sendRatingInfluencer(req,res)
})

app.post('/RatingsSendClient', async(req,res)=>{
    await sendRatingClient(req,res)
})

// app.get('/RecommendationstoClient', async(req,res)=>{
//     await sendRecommendationsClient(req,res)
// })

app.post('/RecommendationstoClient', (authenticateUser), async(req,res)=>{
    await sendRecommendationsClient(req,res)
})


app.get('/AdminOrder', (authenticateUser), async(req,res)=>{
    await AdminOrder(req,res)
})

app.post('/OngoingOrderAdminReject', async(req,res)=>{
    await OngoingRejectAdmin(req,res)
})

app.get('/searchInf', async(req,res) => {
    await findInfluencerByName(req, res)
})

// see the correct files names
//Influencer Profile
// app.get('/InfluencerProfile' , (authenticateUser) , async(req,res) =>{
//     await  getInfluencerProfile(req, res)    
// })

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