"use strict"

const userHelper    = require("../lib/util/user-helper")

const express       = require('express')
const userRoutes  = express.Router()
const bcrypt        = require('bcrypt')
const md5 = require('md5')

// const Mongo       = require("mongodb")


module.exports = function(DataHelpers) {

  userRoutes.post("/login", function(req, res) {

    const filter = {email: req.body.email}

    DataHelpers.getUser(filter, (err, user) => {
      if (err) {
        res.status(401).json({ error: err.message })
      } else if (!user) {
        res.send("Your email address is not registered.")
      }
      else {
        let pass = false
        if (bcrypt.compareSync(req.body.password,user.password)) {
          pass = true
        }
        if (!pass ) {
          res.send("The email address and password does not match.")
        }
        // req.session.user_id = req.body.email
        res.status(201).send()
      }
    })
  }),

  // userRoutes.post("/logout", function(req,res) {
  //   res.status(201).send()
  // }),




  userRoutes.post("/register", function(req,res) {

    let filter = {email: req.body.email}
    DataHelpers.getUser(filter, (err, user) => {
      if (err) {
        res.status(401).json({ error: err.message })
      }
      else if (user) {
          return res.send('This email address is already registred.')
      }
      else {
        filter = {handle: req.body.handle}
        DataHelpers.getUser(filter, (err, user) => {
          if (err) {
            res.status(401).json({ error: err.message })
          }
          else if (user) {
            return res.send('This handle is already registred.')
          }
          else {
            const avatarUrlPrefix = `https://vanillicon.com/${md5(req.body.handle)}`
            const avatars = {
              small:   `${avatarUrlPrefix}_50.png`,
              regular: `${avatarUrlPrefix}.png`,
              large:   `${avatarUrlPrefix}_200.png`
            }
            const user = {
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password,10),
              name: req.body.name,
              avatars: avatars,
              handle: req.body.handle
            }

            DataHelpers.saveUser(user, (err) => {
              if (err) {
                res.status(500).json({ error: err.message })
              } else {
                res.status(201).send()
              }
            })

          }
        })
      }
    })
  })


  return userRoutes

}
