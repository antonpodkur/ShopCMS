const express = require('express');
const router = express.Router();
const UserService = require('../services/user.service');
const authorize = require('../helpers/authorize');


router.post('/authenticate', authenticate);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);

async function authenticate(req, res, next) {
    try{
        const user = await UserService.authenticate(req.body);
        if(user.status === 'ok') {
            res.json(user.data);
        }
        else if (user.status === 'error') {
            res.json({status: 'error', error: user.error});
        }
        else {
            res.json({status: 'error', error: 'Invalid data'});
        }
    } catch(e)
    {
        next(e);
    }

}

async function getAll(req, res, next) {
    try{
        const users = await UserService.getAll();
        res.json(users);
    } catch(e) {
        next(e);
    }
}app.use(express.json())


async function getById(req,res,next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    if( id !== user._id) {
        return res.status(401).json({error: 'Unauthorized' });
    }

    try{
        const user = await UserService.getById(req.params.id)
        if(user.status === 'ok') {
            res.json(user.data);
        }
        else {
            res.sendStatus(404)
        }
    } catch(e) {
        next(e);
    }
}




