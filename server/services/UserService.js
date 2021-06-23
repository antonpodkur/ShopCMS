const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./MailService');
const tokenService = require('./TokenService');
const UserDto = require('../dtos/UserDto');
const ApiError = require('../exceptions/ApiError');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email});
        if(candidate !== null) {
            throw ApiError.BadRequest(`User with email ${email} already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 20);
        const activationLink = uuid.v4()

        const user = await UserModel.create({email, password: hashPassword, activationLink});
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`); 

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }


    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink});
        if(user === null) {
            throw ApiError.BadRequest('Incorrect activation link');
        }
        user.isActivated = true;
        await user.save();
    }
}

module.exports = new UserService();