// include express
const express = require("express");

// include mongoose for database
const mongoose = require("mongoose");

// include cors for cross-site requests
const cors = require("cors");

// allows for the retrieval of information from .env file
require("dotenv").config();

// let app use express
const app = express();
app.use(express.json());
app.use(cors());

// Local Port
const PORT = process.env.PORT;

// start listening
app.listen(PORT, () => console.log(`Server Started on PORT: ${PORT}.`));

// Database Connection String
const Database = process.env.MONGODB_CONNECTION_STRING;

// set up our mongoose
mongoose.connect(Database, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
        if (err) throw err;
        console.log("Connection Established with MongoDB Databse.");
    }
);

app.use("/users", require("./routes/user_route.js"));
app.use("/comment", require("./routes/comment_route.js"));
app.use("/event", require("./routes/event_route.js"));
app.use("/rso", require("./routes/rso_route.js"));
app.use("/university", require("./routes/university_route.js"));