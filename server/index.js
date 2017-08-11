"use strict"

// BASIC EXPRESS SETUP
const PORT          = 8080
const express       = require("express")
const bodyParser    = require("body-parser")
const app           = express()
const bcrypt        = require('bcrypt')



app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))




// MONGODB SETUP
const MongoClient = require("mongodb").MongoClient
const MONGODB_URI = "mongodb://localhost:27017/tweeter"


// CONNECTING TO THE MONGODB DATABASE
MongoClient.connect(MONGODB_URI, (err, db) => {
  // Error while connecting to the database
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`)
    throw err
  }
  // We have a connection to the "tweeter" db
  console.log(`Connected to mongodb: ${MONGODB_URI}`)

  // This module provide an interface to the database of tweets.
  const DataHelpers = require("./lib/data-helpers.js")(db)

  // Passing the DataHelper to tweetsRoutes
  const tweetsRoutes = require("./routes/tweets")(DataHelpers)

  // Passing the DataHelper to userRoutes
  const userRoutes = require("./routes/users")(DataHelpers)

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes)

  // Mount the users routes at the root route
  app.use("/", userRoutes)

})


// APP LISTENER
app.listen(PORT, () => {
  console.log("Tweeter app listening on port " + PORT)
})


