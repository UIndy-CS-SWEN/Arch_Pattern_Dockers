const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/mydb';

app.use(cors());
app.options('*', cors()); // Handle preflight requests
app.use(express.json());

// Explicitly add CORS headers for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


console.log('Node.js app is starting...');

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Define schema and model
const itemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model('Item', itemSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express.js behind HAProxy!');
});

app.post('/items', async (req, res) => {
  try {
    const item = new Item({ name: req.body.name });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: 'Error saving item', details: err });
  }
});

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
