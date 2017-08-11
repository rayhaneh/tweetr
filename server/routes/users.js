"use strict"

const userHelper    = require("../lib/util/user-helper")

const express       = require('express')
const userRoutes  = express.Router()
const bcrypt        = require('bcrypt')

// const Mongo       = require("mongodb")


module.exports = function(DataHelpers) {

  userRoutes.post("/login", function(req, res) {

    const filter = {email: req.body.email}

    DataHelpers.getUser(filter, (err, user) => {
      if (err) {
        res.status(401).json({ error: err.message })
      } else if (!user) {
        res.status(401).send("email does not exist")
      }
      else {
        let pass = false
        if (bcrypt.compareSync(req.body.password,user.password)) {
          pass = true
        }
        if (!pass ) {
          res.status(401).send("wrong password")
        }
        // req.session.user_id = req.body.email
        res.status(201).send()
      }
    })
  }),

  userRoutes.post("/logout", function(req,res) {
    res.status(201).send()
  }),




  userRoutes.post("/register", function(req,res) {
    const user = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password,10),
      name: req.body.name,
      handle: req.body.handle
    }

    DataHelpers.saveUser(user, (err) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.status(201).send()
      }
    })
  })


  return userRoutes

}
