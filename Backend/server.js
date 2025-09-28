const express = require("express");
const dbConnect = require("./config/database");

const app = express();
require("dotenv").config();

const cors = require("cors");

const PORT = process.env.PORT || 4000;
const uploadRoutes = require('./routes/upload');
app.use(cors({
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());



app.use('/api/upload', uploadRoutes); // POST /api/upload/image


app.use('/api/auth', require('./controllers/authController'));
app.use('/api/dashboard', require('./routes/dashboard'));

const batchRoutes = require('./routes/batchRoutes');
app.use('/api/batches', batchRoutes);

// const publicBatchRoutes = require('./routes/publicBatchRoutes');
app.use('/api/public-batches', require('./routes/publicBatchRoutes'));

app.use('/api/payment', require('./routes/paymentRoutes'));

// const paymentRoutes = require("./routes/paymentRoutes");
// app.use("/api/payment", paymentRoutes);

//fetch all the users
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);

// app.use('*', (req, res) => {
//   res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
// });

app.listen(PORT, () => {
  console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
});

dbConnect();