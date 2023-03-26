const mongoose = require('mongoose')
const sanitize = require('mongo-sanitize');

async function Payment (req,res){
    console.log("backend for payment is here ?")
    const { amount, currency } = req.body;
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });
      console.log("is the payment being shown here" , paymentIntent)
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.log("yahan araha hai ?????")
      res.status(500).json({ error: error.message });
    }
}

module.exports = {Payment}