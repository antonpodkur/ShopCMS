const express = require('express');
const mongoose = require('mongoose');
const productPoutes = require('./api/routes/productRoutes');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'));

if(process.env.NODE_ENV==='production') {
    app.use(express.static('../client/build'))
}

mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }, () => {
        console.log("DB is connected");
    });

app.use('/', productPoutes);

app.listen(PORT, ()=> {
    console.log(`App is up and running on port ${PORT}`);
});
