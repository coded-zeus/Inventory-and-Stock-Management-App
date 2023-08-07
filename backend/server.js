const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5500;

mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`I'm listening on port ${PORT}`);
        });
    }
    )