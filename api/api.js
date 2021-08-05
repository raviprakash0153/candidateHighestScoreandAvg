const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const Test = require('../models/Test_score');

//Inserting candidate into database
//DESC - POST api/insert
router.post('/insert', async (req, res) => {
  try {
    const { name, email } = req.body;
    console.log(name);
    const newCandidate = new Candidate({
      name,
      email,
    });
    console.log(newCandidate);
    await newCandidate.save();
    return res
      .status(201)
      .json({ msg: 'Candidate added', Candidate: newCandidate });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

//POST api for assigning score to particular candiadte id,
//we take all 3 test scores from body and then save it to our sum and avg fields in candidate schema
router.post('/score/:candidate_id', async (req, res) => {
  try {
    const candidate = await Candidate.findById({
      _id: req.params.candidate_id,
    });

    const { first_round, second_round, third_round } = req.body;

    const newTest = new Test({
      first_round,
      second_round,
      third_round,
    });
    await newTest.save();
    const sum = first_round + second_round + third_round;
    candidate.score.sum = sum;
    candidate.score.avg = sum / 3;
    await candidate.save();
    return res
      .status(200)
      .json({ msg: 'Succeed', test: newTest, candidate: candidate });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET api to get max sum of all candidates and their avgs in all respective rounds
router.get('/highest', async (req, res) => {
  try {
    //sum and avg
    await Candidate.find()
      .sort('-score.sum')
      .sort('-score.avg')
      .limit(1)
      .exec((error, data) => {
        if (error) {
          return res.status(400).json({ msg: 'error' });
        }
        const sum = data[0].score.sum;
        const avg = data[0].score.avg;
        console.log(data);
        return res.status(200).json({ msg: 'Succeed', maxSum: sum, Avg: avg });
      });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
