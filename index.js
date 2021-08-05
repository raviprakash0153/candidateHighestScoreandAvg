const express = require('express');

const route = require('./api/api');

const mongoose = require('mongoose');

//connect database
const db =
  'mongodb+srv://Ravi:0153ravi@cluster0.agc7k.mongodb.net/candidate?retryWrites=true&w=majority';
try {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log('mongo connected');
} catch (err) {
  console.log('mongo not connected');
}

const app = express();
app.use(express.json());

app.use('/api', route);

app.get('/', (req, res) => {
  res.json({ msg: 'inside homepage' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`connected to ${port}`);
});
