// Stripe payment server for driving school
require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-09-30.clover",
});
const app = express();
app.use(express.json());
app.use(express.static(".")); // Serve static files from root directory
app.use(express.static("public")); // Also serve public folder

const YOUR_DOMAIN = "http://localhost:4242";

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { course, numberOfLessons = 1 } = req.body;
    let lineItems = [];

    // Calculate prices (in cents)
    if (course === "bde") {
      lineItems.push({
        price_data: {
          product_data: { name: "MTO Approved BDE Course" },
          currency: "CAD",
          unit_amount: 45000, // $450
        },
        quantity: 1,
      });
    } else if (course === "individual") {
      lineItems.push({
        price_data: {
          product_data: { name: "Individual Driving Lesson" },
          currency: "CAD",
          unit_amount: 4000, // $40 per hour
        },
        quantity: numberOfLessons,
      });
    } else if (course === "carRental") {
      lineItems.push({
        price_data: {
          product_data: { name: "Car Rental for Road Test" },
          currency: "CAD",
          unit_amount: 8000, // $80
        },
        quantity: 1,
      });
    } else {
      return res.status(400).json({ error: "Invalid course type" });
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: "custom",
      line_items: lineItems,
      mode: "payment",
      return_url: `${YOUR_DOMAIN}/registration.html?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
    });

    res.json({ clientSecret: session.client_secret });
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
