import {Stripe} from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_API_KEY)

export const handleCheckout = async (req,res)=>{
    const {name, email, amount} = req.body;
    const projectID = req.query.projectId;

    const validations = [
        {field: 'name', value: name,message: 'Name is required to fund project'},
        {field: 'email', value: email,message: 'Email is required to fund project'},
        {field: 'amount', value: amount,message: 'Amount is required to fund project'},
        {field: 'projectID', value: projectID,message: 'Project ID is required to fund project'},
    ]

    for(const item of validations){
        if(!item.value){
            return res.status(400).json({message: item.message})
        }
    }
    
    const product = await stripe.products.create({
        name: "Fund",
        description: "Fund a project",
    })
    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: Number(amount).toFixed(2)*100, // Here amount is in (Paise)
        currency: 'inr'
    })

    const exisitingUser = await stripe.customers.list({
        email: email,
        limit: 1
    })
    let customer;

    if(exisitingUser.data.length!=0){
        await stripe.customers.update(exisitingUser.data[0].id,{
            name: name,
            address: {
                line1: '1234 Main Street',
                city: 'Gujarat',
                postal_code: '380015',
                country: 'IN',
            },
        })
        customer =  exisitingUser.data[0];
    }
    else{
        customer = await stripe.customers.create({
            email: email,
            name: name,
            address: {
                line1: '1234 Main Street',
                city: 'Gujarat',
                postal_code: '380015',
                country: 'IN',
            },
        })
    }

    console.log(`This is project: `+projectID)

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'] ,
        line_items: [
            {
                price: price.id,
                quantity: 1
            }
        ],
        payment_intent_data: {
            metadata: {
              projectId: projectID, // Attach metadata here
            },
        },
        customer: customer.id,
        mode: 'payment',
        success_url: `https://dreamfunded-backend.onrender.com/api/payment/success?id=${projectID}`,
        cancel_url: `https://dreamfunded-backend.onrender.com/api/payment/cancel`
    })
    console.log('Thsi is a session',session)
    return res.json({message: "Payment Initiated",session})
}