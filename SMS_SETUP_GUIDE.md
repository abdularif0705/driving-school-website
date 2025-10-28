# SMS Setup Guide for Registration Confirmations

## ✅ What's Been Added

1. **Twilio Package** - Installed `twilio` npm package
2. **SMS Function** - Added `sendRegistrationSMS()` function
3. **Auto-send** - SMS is sent automatically when payment is successful

## 🔑 Setup Instructions

### 1. Get Twilio Account

1. Sign up at [https://www.twilio.com/](https://www.twilio.com/)
2. Get a free trial account (includes $15 credit)
3. Get a Twilio phone number (free or paid)

### 2. Get Your Credentials

From Twilio Console, you'll need:
- **Account SID** - Find in Dashboard
- **Auth Token** - Find in Dashboard (click to reveal)
- **Phone Number** - From Phone Numbers section (format: +1234567890)

### 3. Update .env File

Add these lines to your `.env` file:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

Replace with your actual Twilio credentials.

## 📱 How It Works

1. **User completes payment** → Stripe processes payment
2. **Phone number collected** → From billing address in Stripe checkout
3. **SMS sent automatically** → Via Twilio to user's phone
4. **User receives text** → Registration confirmation with course details

## 💬 SMS Message Content

Users will receive:
```
Thank you for registering! Course: [Course Name], Amount: $[Amount] CAD. 
We'll contact you soon about scheduling. 
Rajput Driving School - (226) 246-2224
```

## 🧪 Testing

1. Complete a test registration with card `4242 4242 4242 4242`
2. Enter a phone number in the billing address
3. Complete payment
4. Check your phone for the SMS!

## 💡 Notes

- **Free Trial**: Twilio trial includes limited SMS
- **Phone Format**: Must include country code (e.g., +12262462224)
- **Cost**: ~$0.0075 per SMS in US/Canada (very cheap!)
- **International**: Works worldwide

## 🚀 Production Setup

For production:
1. Verify your Twilio phone number
2. Upgrade from trial account
3. Set up auto-recharge or payment method
4. Monitor usage in Twilio Console

## 📊 Alternative: SMS Alternatives

If you don't want to use Twilio, you can use:
- **Vonage (formerly Nexmo)** - Similar to Twilio
- **AWS SNS** - Amazon SMS service
- **SendGrid SMS** - If you already use SendGrid

