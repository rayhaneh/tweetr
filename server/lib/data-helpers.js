"use strict"

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // SAVE A SINGLE TWEET
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, (err, result) => {
        if (err) {
          return callback(err)
        }
        callback(null)
      })
    },

    // GET ALL TWEET
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err)
        }
        const sortNewestFirst = (a, b) => a.created_at - b.created_at
        callback(null, tweets.sort(sortNewestFirst))
      })
    },


    getTweet: function(filter, callback) {
      db.collection('tweets').find(filter).toArray((err, tweet) => {
        if (err) {
          return callback(err)
        }
        return callback(null, tweet[0])
      })
    },

    // UPDATES A SINGLE TWEET
    updateTweet: function(filter, edit, callback) {
      db.collection("tweets").findOneAndUpdate(filter, edit, (err) => {
        if (err) {
          return callback(err)
        }
        return callback(null)
      })
    },

    // SAVE A NEW USER
    saveUser: function(newUser, callback) {
      db.collection("users").insertOne(newUser, (err) => {
        if (err) {
          return callback(err)
        }
        callback(null)
      })
    },


    //
    getUser: function (filter, callback) {
      db.collection("users").find(filter).toArray((err, user) => {
        if (err) {
          return callback(err)
        }
        callback(null, user[0])
      })
    },




  }
}
