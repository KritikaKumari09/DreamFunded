import {Router} from 'express'
import express from 'express';
import stripe from 'stripe';
import bodyParser from 'body-parser';
import { handleCheckout } from '../utils/stripe.js'

const router = Router()

router.post('/checkout',handleCheckout);
router.get('/success',(req,res)=>{
    console.log('Payment Compltetd')
    res.json({sucess: true})
})

router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    console.log("HI")
    const sig = request.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    // Handle the event
    switch (event.type) {
      case 'payment_intent.canceled':
        const paymentIntentCanceled = event.data.object;
        // Then define and call a function to handle the event payment_intent.canceled
        break;
      case 'payment_intent.created':
        const paymentIntentCreated = event.data.object;
        // Then define and call a function to handle the event payment_intent.created
        break;
      case 'payment_intent.partially_funded':
        const paymentIntentPartiallyFunded = event.data.object;
        // Then define and call a function to handle the event payment_intent.partially_funded
        break;
      case 'payment_intent.payment_failed':
        const paymentIntentPaymentFailed = event.data.object;
        console.log(`failed: ${paymentIntentPaymentFailed}`)
        // Then define and call a function to handle the event payment_intent.payment_failed
        break;
      case 'payment_intent.processing':
        const paymentIntentProcessing = event.data.object;
        // Then define and call a function to handle the event payment_intent.processing
        break;
      case 'payment_intent.requires_action':
        const paymentIntentRequiresAction = event.data.object;
        console.log(paymentIntentRequiresAction)
        // Then define and call a function to handle the event payment_intent.requires_action
        break;
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        console.log(paymentIntentSucceeded)
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });
  

export default router