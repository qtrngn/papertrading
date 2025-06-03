require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import route modules
const marketRouter = require('./routes/market');

// Middleware
app.use(express.json());

// Mount routers
app.use('/api/market', marketRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/portfolio', portfolioRouter);

// Health check
app.get('/', (req, res) => {
  res.send('Trading API Server is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔗 Market endpoints:`);
  console.log(`   http://localhost:${PORT}/api/market/quotes/AAPL`);
  console.log(`   http://localhost:${PORT}/api/market/bars/TSLA`);
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: true, message: 'Internal server error' });
});

module.exports = app;