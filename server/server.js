const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const router = require('./router')

const PORT = process.env.PORT || 5000;

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', router);

mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }, () => {
        console.log("DB is connected");
    });


app.listen(PORT, ()=> {
    console.log(`App is up and running on port ${PORT}`);
});


