const express = require("express")
const User = require("../models/theatre")
const router = express.Router()

router

.get('/getAllTheatres', (req, res) => {
  try {
    const theatres = User.getAllTheatres();
    res.send(theatres)
  } catch(err) {
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