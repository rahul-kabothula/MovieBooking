const express = require("express")
const Customer = require("../models/customer")
const router = express.Router()

router.get('/getAllCustomers', (req, res) => {
  try {
    const customers = Customer.getAllCustomers();
    res.send(customers)
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})


module.exports = router;