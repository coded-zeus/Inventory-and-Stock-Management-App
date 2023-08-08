const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose")
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');

const app = express();

//middlewares
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(bodyParser.json());

//
app.use("/api/users", userRoute);

//routes
app.get('/', (req, res)=>{
    res.send("Welcome to homepage")
});

const PORT = process.env.PORT || 5500;

mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`I'm listening on port ${PORT}`);
        });
    }
    ).catch((err)=>{
        console.log(err);
    })