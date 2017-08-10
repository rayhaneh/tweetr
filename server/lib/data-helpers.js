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


    // UPDATES A SINGLE TWEET
    updateTweet: function(filter,callback) {
      db.collection("tweets").find(filter).toArray((err, tweet) => {
        if (err) {
          return callback(err)
        }
        tweet = tweet[0]
        db.collection("tweets").updateOne(filter, { $set: {"like": !tweet.like}}, (err) => {
            if(err) {
              return callback(err)
            }
          })
        callback(null)
      })
    }







  }
}
