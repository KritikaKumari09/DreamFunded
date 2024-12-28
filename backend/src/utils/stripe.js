import {Stripe} from 'stripe'

const stripe = new Stripe(process.env.STRIPE_API_KEY)

export const handleCheckout = async (req,res)=>{
    console.log('Hii')
    const product = await stripe.products.create({
        name: "Shoes",
    })
    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: 48948, // Here amount is in (Paise)
        currency: 'inr'
    })
    const customer = await stripe.customers.create({
        email: 'riyapatel016@gmail.com',
        name: 'Riya Patel',
        address: {
            line1: '1234 Main Street',
            city: 'Gujarat',
            postal_code: '380015',
            country: 'IN',
        },
    })
    const exisiting  = await stripe.customers.retrieve("cus_RTDvSJ2iZgaXFc")
    console.log(exisiting)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'] ,
        line_items: [
            {
                price: price.id,
                quantity: 1
            }
        ],
        customer: customer.id,
        mode: 'payment',
        success_url: 'http://localhost:8000/api/payment/success',
        cancel_url: 'http://localhost:8000/api/payment/cancel'
    })
    return res.json({message: "Payment Initiated",session})
}