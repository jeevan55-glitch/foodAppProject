const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

console.log("Stripe Secret Key Loaded:", !!process.env.STRIPE_SECRET_KEY);

// Process Payment
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("========== PAYMENT REQUEST ==========");
    console.log(req.body);

    const lineItems = req.body.items.map((item) => {
      const imageUrl = item.foodItem.images?.[0]?.url;

      console.log("Food:", item.foodItem.name);
      console.log("Image URL:", imageUrl);

      const productData = {
        name: item.foodItem.name,
      };

      // Only send valid image URLs to Stripe
      if (
        imageUrl &&
        (imageUrl.startsWith("http://") ||
          imageUrl.startsWith("https://"))
      ) {
        productData.images = [imageUrl];
      }

      return {
        price_data: {
          currency: "inr",
          product_data: productData,
          unit_amount: Math.round(item.foodItem.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      customer_email: req.user.email,

      phone_number_collection: {
        enabled: true,
      },

      payment_method_types: ["card"],

      line_items: lineItems,

      mode: "payment",

      shipping_address_collection: {
        allowed_countries: ["IN", "US"],
      },

      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery Charges",
            type: "fixed_amount",
            fixed_amount: {
              amount: 5500,
              currency: "inr",
            },
            delivery_estimate: {
              minimum: {
                unit: "hour",
                value: 1,
              },
              maximum: {
                unit: "hour",
                value: 3,
              },
            },
          },
        },
      ],

      success_url: `${process.env.FRONTEND_URL}success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}cart`,
    });

    console.log("Stripe Session Created:", session.id);

    res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (err) {
    console.log("========== STRIPE ERROR ==========");
    console.log(err);
    console.log("==================================");

    return res.status(400).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
});

// Send Stripe API Key
exports.sendStripeApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});