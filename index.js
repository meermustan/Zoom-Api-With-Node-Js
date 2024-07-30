//basic required imports
require('dotenv').config();
const express = require("express");
const meetingController = require("./controllers/meetingController");

//initialize our app as express server
const app = express();

// middleware to handle the coming body from the request
app.use(express.json({ extended: false }));


app.use("/api/meeting/", meetingController);

// Our app route '/' and return a response
app.get("/", (req, res) => {
    res.send("Server up and running")
});

//set your port
const PORT = process.env.PORT || 8000;

// run our app on our custom port
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});