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

// Use environment variable for domain, fallback to localhost for development
const YOUR_DOMAIN = process.env.DOMAIN || "http://localhost:4242";

app.post("/create-checkout-session", async (req, res) => {
  try {
    console.log("=" .repeat(60));
    console.log("📥 New checkout session request received");
    console.log("⏰ Timestamp:", new Date().toISOString());
    console.log("📦 Request body:", JSON.stringify(req.body, null, 2));
    console.log("=" .repeat(60));
    
    const { course, numberOfLessons = 1 } = req.body;
    
    // Validate course is provided
    if (!course) {
      console.error("❌ Missing course parameter");
      return res.status(400).json({ error: "Course is required" });
    }
    
    // Log the course and lessons info
    console.log(`🎯 Course selected: ${course}`);
    console.log(`📚 Number of lessons: ${numberOfLessons}`);
    
    // Validate course type
    if (!['bde', 'individual', 'carRental'].includes(course)) {
      console.error("❌ Invalid course type:", course);
      return res.status(400).json({ error: "Invalid course type" });
    }
    
    let lineItems = [];

    // Calculate prices (in cents)
    // Includes 13% HST + 3% Stripe fee = 16% markup
    // BDE: $450 * 1.16 = $522.00 = 52200 cents
    // Individual: $40 * 1.16 = $46.40 = 4640 cents per hour
    // Car Rental: $80 * 1.16 = $92.80 = 9280 cents
    
    if (course === "bde") {
      console.log("✅ Creating BDE course checkout");
      lineItems.push({
        price_data: {
          product_data: { name: "MTO Approved BDE Course" },
          currency: "CAD",
          unit_amount: 52200, // $450 + 13% HST + 3% fee = $522
        },
        quantity: 1,
      });
      console.log("💰 BDE Total: $522.00 CAD");
      
    } else if (course === "individual") {
      console.log(`✅ Creating Individual lessons checkout: ${numberOfLessons} lessons`);
      const lessonPriceWithTax = 4640; // $46.40 per lesson (includes HST + fee)
      const totalPrice = lessonPriceWithTax * numberOfLessons;
      
      lineItems.push({
        price_data: {
          product_data: { name: `Individual Driving Lesson${numberOfLessons > 1 ? 's' : ''} (${numberOfLessons}x)` },
          currency: "CAD",
          unit_amount: lessonPriceWithTax, // $46.40 per lesson including tax
        },
        quantity: numberOfLessons,
      });
      console.log(`💰 Individual lessons total: $${(totalPrice / 100).toFixed(2)} CAD (${numberOfLessons} x $46.40)`);
      
    } else if (course === "carRental") {
      console.log("✅ Creating Car Rental checkout");
      lineItems.push({
        price_data: {
          product_data: { name: "Car Rental for Road Test" },
          currency: "CAD",
          unit_amount: 9280, // $80 + 13% HST + 3% fee = $92.80
        },
        quantity: 1,
      });
      console.log("💰 Car Rental Total: $92.80 CAD");
    } else {
      return res.status(400).json({ error: "Invalid course type" });
    }

    console.log("🔗 Creating Stripe checkout session...");
    
    const sessionOptions = {
      ui_mode: "custom",
      line_items: lineItems,
      mode: "payment",
      return_url: `${YOUR_DOMAIN}/registration.html?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
      // Don't collect billing address - we already have it in the form
      // billing_address_collection: "auto",
    };
    
    // Don't set customer_email here - Stripe Payment Element handles email collection
    // Setting it manually causes conflicts with the confirm() method
    console.log("📋 Session options:", JSON.stringify(sessionOptions, null, 2));
    console.log("🔗 Calling Stripe API...");
    
    const session = await stripe.checkout.sessions.create(sessionOptions);

    console.log("=" .repeat(60));
    console.log("✅ SUCCESS - Stripe session created!");
    console.log("🔑 Session ID:", session.id);
    console.log("🔑 Client secret:", session.client_secret.substring(0, 30) + "...");
    console.log("💰 Total amount:", session.amount_total);
    console.log("💳 Customer email:", session.customer_email || 'Not set');
    console.log("=" .repeat(60));

    res.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("=" .repeat(60));
    console.error("❌ ERROR creating checkout session!");
    console.error("📝 Error message:", err.message);
    console.error("📝 Error type:", err.type);
    console.error("📝 Error code:", err.code);
    console.error("📝 Full error:", JSON.stringify(err, null, 2));
    console.error("=" .repeat(60));
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

app.get("/session-status", async (req, res) => {
  try {
    const sessionId = req.query.session_id;
    console.log("📊 Checking session status for:", sessionId);
    
    const session = await stripe.checkout.sessions.retrieve(
      sessionId,
      { expand: ["payment_intent", "customer_details"] }
    );
    
    console.log("✅ Session retrieved");
    console.log("   Status:", session.status);
    console.log("   Payment Status:", session.payment_status);
    console.log("   Payment Intent ID:", session.payment_intent?.id);
    
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
  } catch (err) {
    console.error("❌ Error retrieving session:", err.message);
    res.status(500).json({ error: "Error retrieving session: " + err.message });
  }
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

app.listen(4242, () => {
  console.log("=" .repeat(50));
  console.log("🚀 Stripe payment server running on port 4242");
  console.log("📋 Price breakdown:");
  console.log("   BDE Course: $522.00 CAD (includes HST + Stripe fee)");
  console.log("   Individual Lessons: $46.40 CAD/hour (includes HST + Stripe fee)");
  console.log("   Car Rental: $92.80 CAD (includes HST + Stripe fee)");
  console.log("=" .repeat(50));
});
