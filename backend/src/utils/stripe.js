import {Stripe} from 'stripe'

const stripe = new Stripe(process.env.STRIPE_API_KEY)

export const handleCheckout = async (req,res)=>{
    console.log('Hii')
    const product = await stripe.products.create({
        name: "Shoes",
    })
    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: 2000,
        currency: 'usd'
    })
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'] ,
        line_items: [
            {
                price: price.id,
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'http://localhost:8000/api/payment/success',
        cancel_url: 'http://localhost:8000/api/payment/cancel'
    })
    return res.json({message: "Payment Initiated",session})
}