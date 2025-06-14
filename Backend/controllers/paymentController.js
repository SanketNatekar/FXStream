// const Razorpay = require("razorpay");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// exports.createOrder = async (req, res) => {
//   const { amount, batchId } = req.body;

//   const options = {
//     amount: amount * 100, // amount in paise (INR)
//     currency: "INR",
//     receipt: `receipt_${batchId}_${Date.now()}`,
//   };

//   try {
//     const order = await razorpay.orders.create(options);
//     res.json({ success: true, order });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Payment order failed" });
//   }
// };
