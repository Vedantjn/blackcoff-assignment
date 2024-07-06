// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true, // Remove this line
  // useUnifiedTopology: true, // Remove this line
});

app.use('/api', dataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
