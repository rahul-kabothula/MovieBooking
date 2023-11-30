const express = require("express")
const User = require("../models/theatre")
const router = express.Router()

router.get('/getAllTheatres', (req, res) => {
  try {
    const theatres = User.getAllTheatres();
    res.send(theatres)
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})


module.exports = router;