const express = require("express")
const Theatre = require("../models/theatre")
const router = express.Router()

router

.get('/getAllTheatres', async (req, res) => {
  try {
    const theatres = await Theatre.getAllTheatres();
    res.send(theatres)
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.post('/ticketBooking', async (req, res) => {
    try{
        const confirmation = await Theatre.bookTicket(req.body);
        res.send(confirmation)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

.post('/getAllBookings', async (req, res) => {
    try{
        const allBookings = await Theatre.getAllBookings(req.body);
        res.send(allBookings)
    } catch(err){
        res.status(401).send({message: err.message})
    }
})

.delete('/delete/theatre', async (req, res) => {
  try {
    await User.deleteTheatre(req.body)
    res.send({success: "Theatre deleted"})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.put('/edit/theatre', async (req, res) => {
   try {
     let theatre = await User.editTheatre(req.body)
     res.send({...theatre, Password: undefined})
   } catch(err) {
     res.status(401).send({message: err.message})
   }
 })

.post('/create/theatre', async (req, res) => {
    try{
        const theatre = await User.createTheatre(req.body)
        res.send({...theatre, Password: undefined})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})




module.exports = router;