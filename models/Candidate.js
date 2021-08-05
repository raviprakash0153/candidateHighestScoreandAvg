const mongoose = require('mongoose');
const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  score: {
    sum: {
      type: Number,
    },
    avg: {
      type: Number,
    },
  },
});

const Candidate = mongoose.model('candidate', candidateSchema);

module.exports = Candidate;
