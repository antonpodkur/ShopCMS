require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function authenticate({email, password}) {
    const user = await User.findOne({email}).lean();

    if(!user) {
        return {status: 'error', error: 'Invalid username/password'};
    }

    if(await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET);
        const {password, ...userWithoutPassword} = user;
        return {status: 'ok', data: {...userWithoutPassword, token}};
    }

    return {status: 'error', error: 'Invalid username/password'};
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    const user = await User.findById({_id: id});
    if(!user) {
        return {status: 'error', error: 'User does not exist'};
    }

    return {status: 'ok', data: user};
}

module.exports = {
    authenticate,
    getAll,
    getById
}