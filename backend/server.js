const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose")
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const productRoute = require("./routes/productRoutes")
const errorHandler = require('./middlewares/errorMiddleware');
const cookieParser = require("cookie-parser")

const app = express();

//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

//

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

//routes
app.get('/', (req, res)=>{
    res.send("Welcome to homepage")
});
app.use(errorHandler)

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