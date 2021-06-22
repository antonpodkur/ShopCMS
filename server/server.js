const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./helpers/errorHandler');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV==='production') {
    app.use(express.static('../client/build'))
}

app.use('/users', require('./controllers/user.controller'));

app.use(errorHandler);

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


