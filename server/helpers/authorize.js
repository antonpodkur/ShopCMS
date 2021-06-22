const jwt = require('express-jwt');
require('dotenv').config();

export default function authorize() {
    return [
        jwt( process.env.JWT_SECRET), 

        (req, res, next) => {
            next();
        }
    ]
}