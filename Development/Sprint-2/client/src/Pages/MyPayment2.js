import { useState} from "react";
import StripeCheckout from "react-stripe-checkout";

const REACT_APP_STRIPE_KEY = 'pk_test_51MpBtqAF4ik8eFskzefWihMO6wp29rM4LQI3jkUtk3VPvOIeCV4Z6JjOI52Lo8xkLerWZnbyyV5CVvDcw8Oh1Fbm00gVWfnuQ4'

const OrderForm2 =()=>{
const [ amount, setAmount ] = useState(0);

  const handleToken = (token) => {
    fetch("/payment/donate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, amount }),
    })
    .then(res => res.json())
    .then(_ => {
      window.alert("Transaction Successful.");
    }).catch(_ => window.alert("Transaction Failed."))
  }

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };
  
  return (
    <div className="App" 
    style={{
       display: 'flex', 
       justifyContent: 'center', 
       alignItems: 'center',
       width: '100%',
       height: "100vh",
       flexDirection: 'column',
       gap: 15,
       }}>

        <label>
          Amount:
          <input type="text"  onChange={handleAmountChange} />
        </label>


    <StripeCheckout
          stripeKey={REACT_APP_STRIPE_KEY }
          token={handleToken}
          name=""
          panelLabel={`Donate`}
          currency="USD"
          amount={amount * 100}
      >
      </StripeCheckout>
</div>
  );
}

export default OrderForm2;