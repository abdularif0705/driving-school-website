// Stripe payment server for driving school
require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-09-30.clover",
});
// const nodemailer = require("nodemailer");
// const twilio = require("twilio");
const app = express();
app.use(express.json());
app.use(express.static(".")); // Serve static files from root directory
app.use(express.static("public")); // Also serve public folder

// Configure email transporter (commented out for now)
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// Configure Twilio for SMS (commented out for now)
// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

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
      billing_address_collection: "auto", // Collect billing address which includes phone
      customer_email: "customer@example.com", // This will be updated with actual email from form
    });

    res.json({ clientSecret: session.client_secret });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

app.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(
    req.query.session_id,
    { expand: ["payment_intent", "customer_details"] }
  );
  
  // Send email if payment is successful (commented out for now)
  // if (session.payment_status === 'paid' && session.customer_details?.email) {
  //   await sendRegistrationEmail(session);
  // }
  
  res.json({
    status: session.status,
    payment_status: session.payment_status,
    payment_intent_id: session.payment_intent.id,
    payment_intent_status: session.payment_intent.status,
  });
});

// Function to send registration confirmation email
async function sendRegistrationEmail(session) {
  try {
    const courseName = session.line_items?.data[0]?.description || "Driving Course";
    const amount = (session.amount_total / 100).toFixed(2);
    const confirmationLink = `${YOUR_DOMAIN}/registration.html?session_id=${session.id}&confirmed=true`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: session.customer_details.email,
      subject: 'Registration Confirmation - Rajput Driving School Windsor',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ce252a;">Registration Successful!</h2>
          <p>Thank you for registering with Rajput Driving School Windsor.</p>
          <p><strong>Course:</strong> ${courseName}</p>
          <p><strong>Amount Paid:</strong> $${amount} CAD</p>
          <p><strong>Payment Status:</strong> ${session.payment_status}</p>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${confirmationLink}" 
               style="background-color: #ce252a; color: white; padding: 15px 30px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;
                      font-weight: bold;">
              View Your Registration Details
            </a>
          </div>
          
          <p>We will contact you shortly with more information about your course schedule.</p>
          <p>If you have any questions, please contact us at (226) 246-2224 or rajputwindsor@gmail.com</p>
          
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            Or copy this link to your browser:<br>
            <span style="color: #ce252a; word-break: break-all;">${confirmationLink}</span>
          </p>
          
          <hr>
          <p style="font-size: 12px; color: #666;">Rajput Driving School Windsor<br>Windsor, ON</p>
        </div>
      `
    };

    // await transporter.sendMail(mailOptions);
    // console.log('Registration email sent to:', session.customer_details.email);
    
    // Also send SMS if phone number is available
    // if (session.customer_details?.phone) {
    //   await sendRegistrationSMS(session);
    // }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Function to send SMS confirmation (commented out for now)
// async function sendRegistrationSMS(session) {
//   try {
//     const courseName = session.line_items?.data[0]?.description || "Driving Course";
//     const amount = (session.amount_total / 100).toFixed(2);
    
//     const message = `Thank you for registering! Course: ${courseName}, Amount: $${amount} CAD. We'll contact you soon about scheduling. Rajput Driving School - (226) 246-2224`;
    
//     await twilioClient.messages.create({
//       body: message,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: session.customer_details.phone
//     });
    
//     console.log('Registration SMS sent to:', session.customer_details.phone);
//   } catch (error) {
//     console.error('Error sending SMS:', error);
//   }
// }

app.listen(4242, () =>
  console.log("Stripe payment server running on port 4242")
);
