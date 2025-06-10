const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here';

// 🔐 Middleware to check token
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: 'Access Denied. No Token Provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

// 🛡️ Middleware to allow only admins
const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// ✅ Optional: Only users (not admins)
const isUser = (req, res, next) => {
  if (req.user?.role !== 'user') {
    return res.status(403).json({ message: 'User access required' });
  }
  next();
};

module.exports = { protect, isAdmin, isUser };
