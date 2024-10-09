import {Router} from 'express'
import bodyParser from 'body-parser';
import { handleCheckout } from '../utils/stripe.js'

const router = Router()

router.post('/checkout',handleCheckout);
router.get('/success',(req,res)=>{
    console.log('Payment Compltetd')
    res.json({sucess: true})
})
router.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {
    console.log("this is webhook")
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        // Verify that the webhook event came from Stripe
        event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_c1e7059d20aaf5d845fce72da31e33e6a801a9fc543cc2f2a2e9137e7a1f35aa');
    } catch (err) {
        console.log(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        console.log('PaymentIntent was successful!', paymentIntent);
    } else {
        console.log(`Unhandled event type ${event.type}`);
    }

    // Acknowledge receipt of the event
    res.json({ received: true });
});
  

export default router