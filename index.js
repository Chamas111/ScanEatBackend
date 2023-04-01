require('dotenv/config');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/users');
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 9000;
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/products', productsRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('hello World');
});

if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../client/build');
  // Serve static files from the build folder
  app.use(express.static(buildPath));

  // Serve the index.html file if a route is not found
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
