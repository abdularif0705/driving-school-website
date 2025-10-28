# Stripe Payment Integration Setup Guide

## 🚀 Quick Start

Your awesome registration page with Stripe payment integration is ready! Follow these steps to get it live:

## 📋 Prerequisites

1. **Stripe Account**: Sign up at [stripe.com](https://stripe.com)
2. **PHP with Composer**: For server-side payment processing
3. **SSL Certificate**: Required for live payments (Stripe requires HTTPS)

## 🔧 Setup Steps

### 1. Install Stripe PHP Library

```bash
# Navigate to your website directory
cd /path/to/your/website

# Install Composer (if not already installed)
curl -sS https://getcomposer.org/installer | php

# Install Stripe PHP library
php composer.phar require stripe/stripe-php
```

### 2. Configure Stripe Keys

1. **Get your Stripe keys** from your [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. **Update the registration page** (`registration.html` line ~865):

   ```javascript
   let stripe = Stripe("pk_test_your_publishable_key_here"); // Replace with your actual publishable key
   ```

3. **Update the payment handler** (`payment-handler.php` line ~6):
   ```php
   \Stripe\Stripe::setApiKey('sk_test_your_secret_key_here'); // Replace with your actual secret key
   ```

### 3. Set Up Webhook (for confirmation emails)

1. **Create a webhook endpoint** in your [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. **Set the endpoint URL** to: `https://yourwebsite.com/stripe-webhook.php`
3. **Listen for these events**:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. **Copy the webhook secret** and update `stripe-webhook.php` line ~12:
   ```php
   $endpoint_secret = 'whsec_your_webhook_secret_here';
   ```

### 4. Configure Email Settings

Update the email settings in `stripe-webhook.php` (lines ~67-72):

```php
$mail->Username   = 'rajputwindsor@gmail.com'; // Your email
$mail->Password   = 'your_app_password'; // Use Gmail App Password
```

**For Gmail:**

1. Enable 2-factor authentication
2. Generate an App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Use the generated app password (not your regular password)

### 5. File Permissions

Make sure the registration directory is writable:

```bash
chmod 755 registrations/
```

## 🎨 Features Included

✅ **3-Step Registration Process**

- Course selection with pricing
- Student information form
- Secure payment processing

✅ **Course Options**

- MTO Approved BDE Course ($450, was $799)
- Individual Driving Lessons ($40/hr, was $60/hr)
- Rent Car for Road Test ($80, was $120)

✅ **Payment Features**

- Secure Stripe payment processing
- Automatic tax calculation (13% HST)
- Real-time payment validation
- Mobile-responsive design

✅ **Automated Workflows**

- Instant confirmation emails
- Payment logging
- Failed payment tracking
- Registration database

✅ **Professional Design**

- Matches your website branding perfectly
- Modern glassmorphism card effects with animated gradients
- Smooth animations and micro-interactions
- Gradient backgrounds with animated color shifts
- Visual discount badges and pricing highlights
- Animated checkmarks and progress indicators
- Enhanced mobile responsiveness
- Cool hover effects and state transitions

## 🔐 Security Features

- **PCI Compliance**: Stripe handles all card data securely
- **HTTPS Required**: Secure data transmission
- **Input Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error management

## 📱 Mobile Responsive

The registration page works perfectly on:

- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🧪 Testing

### Test Card Numbers (for development):

- **Visa**: 4242 4242 4242 4242
- **Visa (debit)**: 4000 0566 5566 5556
- **Mastercard**: 5555 5555 5555 4444
- **American Express**: 3782 8224 6310 005

Use any future expiry date and any 3-digit CVC.

## 🚀 Going Live

1. **Switch to live keys** in both files:

   - Replace `pk_test_...` with `pk_live_...`
   - Replace `sk_test_...` with `sk_live_...`

2. **Update webhook endpoint** to use live mode

3. **Test thoroughly** with real (small amount) transactions

## 📊 Registration Management

All registrations are logged in the `registrations/` directory:

- `completed_registrations.json` - Successful payments
- `failed_payments.log` - Failed payment attempts
- `registration_YYYY-MM-DD.log` - Daily registration logs

## 🔗 Navigation Updates

The registration page is now linked in your main navigation. Users can access it via:

- "Register Now" button in the navbar
- Direct URL: `yourwebsite.com/registration.html`

## 📞 Support

For any issues with setup:

1. Check Stripe logs in your dashboard
2. Check your server error logs
3. Ensure all file permissions are correct
4. Verify SSL certificate is working

## 🎉 You're All Set!

Your professional registration page with secure payment processing is ready to accept students! The page seamlessly integrates with your existing website design and provides a smooth user experience from course selection to payment confirmation.

**Key Benefits:**

- Instant online registrations 24/7
- Automated confirmation emails
- Secure payment processing
- Professional appearance
- Mobile-friendly design
- Reduced administrative workload

Start accepting registrations immediately and watch your driving school grow! 🚗💨
