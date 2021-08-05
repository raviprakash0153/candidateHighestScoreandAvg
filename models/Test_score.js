const mongoose = require('mongoose');
const TestSchema = new mongoose.Schema({
  first_round: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  second_round: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  third_round: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
});

const Test = mongoose.model('test', TestSchema);

module.exports = Test;
