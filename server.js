// Stripe payment server for driving school
require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(express.json());

const YOUR_DOMAIN = "http://localhost:4242";

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { course } = req.body;
    let lineItem;
    // Calculate total with 13% HST and 3% Stripe fee
    // BDE: $450 + 13% + 3% = $450 * 1.16 = $522
    // Individual: $40 * 1.16 = $46.40
    // Car Rental: $80 * 1.16 = $92.80
    if (course === "bde") {
      lineItem = {
        price_data: {
          product_data: { name: "BDE Course" },
          currency: "CAD",
          unit_amount: 52200,
        },
        quantity: 1,
      };
    } else if (course === "individual") {
      lineItem = {
        price_data: {
          product_data: { name: "Individual Driving Lesson" },
          currency: "CAD",
          unit_amount: 4640,
        },
        quantity: 1,
      };
    } else if (course === "carRental") {
      lineItem = {
        price_data: {
          product_data: { name: "Car Rental for Road Test" },
          currency: "CAD",
          unit_amount: 9280,
        },
        quantity: 1,
      };
    } else {
      return res.status(400).json({ error: "Invalid course type" });
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: "custom",
      billing_address_collection: "auto",
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      line_items: [lineItem],
      mode: "payment",
      return_url: `${YOUR_DOMAIN}/complete.html?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
    });

    res.json({ clientSecret: session.client_secret, sessionId: session.id });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

app.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(
    req.query.session_id,
    { expand: ["payment_intent"] }
  );
  res.json({
    status: session.status,
    payment_status: session.payment_status,
    payment_intent_id: session.payment_intent.id,
    payment_intent_status: session.payment_intent.status,
  });
});

app.listen(4242, () =>
  console.log("Stripe payment server running on port 4242")
);
