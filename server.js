const express = require("express");
const app = express();
const stripe = require("stripe")("sk_test_yourSecretKeyHere");
const path = require("path");

app.use(express.static("."));
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Ecom Mastery Dropshipping Course",
              description: "Premium high-ticket dropshipping course",
            },
            unit_amount: 29700,
          },
          quantity: 1,
        },
      ],
      success_url: "https://yourdomain.com/success",
      cancel_url: "https://yourdomain.com/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(4242, () => console.log("Server running on http://localhost:4242"));
