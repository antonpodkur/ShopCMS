const express = require('express');
const mongoose = require('mongoose');
const productPoutes = require('./router/productRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/ErrorMiddleware');
require('dotenv').config();

const userRouter = require('./router/userRouter');

const PORT = process.env.PORT || 5000;

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/uploads',express.static('uploads'));

app.use('/api/users', userRouter);

app.use(errorMiddleware);

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
