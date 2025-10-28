# Stripe Payment Integration - Setup Guide

## ✅ What's Been Fixed

### 1. **Updated Stripe API Version**

- Changed from: `js.stripe.com/v3` (old Elements API)
- Changed to: `js.stripe.com/clover/stripe.js` (new Custom Checkout API)

### 2. **Fixed Payment Flow**

- **Old approach**: Tried to redirect to `checkout.stripe.com` (doesn't work with custom UI)
- **New approach**: Uses `ui_mode: "custom"` with confirmation pattern
- Payment now stays on your site with your custom UI

### 3. **Updated Server Configuration**

- Added `apiVersion: "2025-09-30.clover"` to server.js
- Added `express.static("public")` to serve static files
- Properly returns `clientSecret` for custom checkout

## 🔑 What You Need To Do

### 1. Add Your Real Stripe Keys

Create a `.env` file in your driving-school-website folder:

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### 2. Update registration.html

Replace line 1371 with your real publishable key:

```javascript
let stripe = Stripe("pk_test_your_publishable_key_here");
```

### 3. Start Your Server

```bash
cd C:\Users\ASUS\Desktop\Coding\driving-school-website
npm start
```

Or if you have a start script:

```bash
node server.js
```

### 4. Test the Payment Flow

1. Open: `http://localhost:4242/registration.html`
2. Select a course
3. Fill in student information
4. When you get to payment section, Stripe elements will load automatically
5. Enter test card: `4242 4242 4242 4242`
6. Click "Complete Registration"

## 🎯 How It Works Now

### Custom Checkout Flow:

1. **User fills form** → Selects course, enters info
2. **Click "Continue to Payment"** → Backend creates checkout session, returns `clientSecret`
3. **Stripe elements load** → Payment fields appear (card, billing, shipping)
4. **User enters payment** → Data never touches your server (PCI compliant)
5. **Click "Complete Registration"** → `actions.confirm()` processes payment
6. **Success!** → Redirects to `registration.html?session_id=xxx`
7. **Page reloads** → Shows success message

## 📊 Key Differences

| Old Approach                     | New Approach             |
| -------------------------------- | ------------------------ |
| Used Card Element API            | Uses Custom Checkout API |
| Redirected to Stripe hosted page | Stays on your site       |
| Limited customization            | Full control over UI     |
| Payment via redirect             | Payment via confirmation |

## 🧪 Test Cards

```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any valid postal code (e.g., N9B 3X3)
```

## ⚠️ Important Notes

1. **Taxes**: Currently using `automatic_tax: { enabled: true }` - Stripe calculates HST automatically
2. **Currency**: Set to CAD (Canadian Dollars)
3. **Return URL**: Set to `/registration.html?session_id={CHECKOUT_SESSION_ID}` to show success on your page
4. **Shipping**: Enabled for US and CA countries (required for some payment methods)

## 🚀 Next Steps

1. Add your real Stripe keys
2. Test with test cards
3. Customize the success message if needed
4. Deploy to production (replace test keys with live keys)
