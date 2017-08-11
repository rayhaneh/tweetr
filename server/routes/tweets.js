"use strict"

const userHelper    = require("../lib/util/user-helper")

const express       = require('express')
const tweetsRoutes  = express.Router()

const Mongo       = require("mongodb")


module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.json(tweets)
      }
    })
  })

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'})
      return
    }

    const filter = {email: req.body.email}
    const tweet = {
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      like: false
    }

    DataHelpers.getUser(filter, (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        tweet.user = user
        DataHelpers.saveTweet(tweet, (err) => {
          if (err) {
            res.status(500).json({ error: err.message })
          } else {
            res.status(201).send()
          }
        })

      }
    })



  })

  tweetsRoutes.put("/:id/like", function(req, res) {
    const filter = { "_id": new Mongo.ObjectID(req.params.id)}
    DataHelpers.updateTweet(filter, (err) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.status(201).send()
      }
    })
  })

  return tweetsRoutes

}
