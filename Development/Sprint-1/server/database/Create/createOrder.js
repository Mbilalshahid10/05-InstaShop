const Order = require('../Schema/Order')

async function createOrder(OrderID, clemail , infemail, price, status="Pending", acceptedByClient=false,  ratingGivenClient , ratingGivenInfluencer  ) {
    
    const order = await Order.create({  
        orderID: OrderID,
        clientEmail: clemail,
        influencerEmail: infemail,
        price: price,
        status: status,
        acceptedByClient: acceptedByClient,
        ratingGivenClient: ratingGivenClient,
        ratingGivenInfluencer:ratingGivenInfluencer
    })
    await order.save()
}

module.exports = {createOrder}