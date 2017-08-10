"use strict"

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // SAVE TWEET HELPER
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, (err, result) => {
        if (err) {
          return callback(err)
        }
        callback(null)
      })
    },

    // GET TWEET HELPER
    getTweets: function(callback) {
    db.collection("tweets").find().toArray((err, tweets) => {
      if (err) {
        return callback(err)
      }
      const sortNewestFirst = (a, b) => a.created_at - b.created_at
      callback(null, tweets.sort(sortNewestFirst))
    })
  }


  }
}
