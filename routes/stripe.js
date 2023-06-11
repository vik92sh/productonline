const express = require("express");
const Stripe = require("stripe");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();


router.post('/create-checkout-session', async (req, res) => {
    const line_items = req.body.cartItems.map((item) => {
        console.log(item.image,'jwabhjwdhb')
    return {
        price_data: {
            currency: 'inr',
            product_data: {
              name: item.desc,
              images: [item.image],
            description: item.description,
            },
            unit_amount: 2000,
          },
          quantity: 1,
    };
  });
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
  
    res.send({url: session.url});
  });

  module.exports = router;
