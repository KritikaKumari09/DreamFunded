import {Router} from 'express'
import express from 'express';
import stripe from 'stripe';
import {stripe as Stripe} from "../utils/stripe.js"
import bodyParser from 'body-parser';
import { handleCheckout } from '../utils/stripe.js'
import { upload } from '../middlewares/multer.middlewares.js';
import Receipt from "../models/reciept.Schema.js"
import { User } from '../models/userSchema.js';
import mongoose from 'mongoose';
import { Project } from '../models/projectSchema.js';
import { Chat } from '../models/chat.Schema.js';

const router = Router()

router.post('/checkout',upload.none(),handleCheckout);
router.get('/success',(req,res)=>{
    const id = req.query.id;

    res.sendFile('success.html',{root: './public'})
})

router.post('/webhook', express.raw({type: 'application/json'}), async(request, response) => {
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

        const projectID = paymentIntentSucceeded.metadata?.projectId;
        const customerID = paymentIntentSucceeded.customer;
        const amount = paymentIntentSucceeded.amount_received;
        const currency = paymentIntentSucceeded.currency;
        const paymentMethodType = paymentIntentSucceeded.payment_method_types[0];
        const status = paymentIntentSucceeded.status;
        const customer = await Stripe.customers.retrieve(customerID);
        const user = await User.findOne({email: customer.email});

        const project = await Project.findOne({_id: new mongoose.Types.ObjectId(projectID)});
        project.addFunds(user._id, amount/100);
        await project.save();
        
        // Adding payer to the group chat
        const chat = await Chat.findOne({projectID: new mongoose.Types.ObjectId(projectID)});
        chat.participants.push(user._id);
        await chat.save();
        const receipt = new Receipt({
            payer: user._id,
            projectId: new mongoose.Types.ObjectId(projectID),
            amount,
            currency,
            paymentMethodType,
            status
        })

        await receipt.save();
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });
  

export default router