const db = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require("../models");

const passService = require('../services/password');
const tokenService = require('../services/token');

exports.signup = async (req, res) => {
    console.log('tentative d inscription');
    const password = req.body.password;
    const hashedPassword = await passService.hashPassword(password);
    const email = req.body.email;

    const emailFound = await db.USER.findOne({where: {email: email}});
    if (emailFound) {
        return res.status(200).json({message: {txt:'An account with this email address already exists.', code: 'email_already_used'}});
    }

    let user = db.USER.build({
        password: hashedPassword,
        email: email
    });
    await user.save();

    return res.status(200).json({message: {txt: 'Inscription réussie'}});
}

exports.signin = async (req, res) => {
    console.log('tentative de connexion');
    const password = req.body.password;
    const hashedPassword = await passService.hashPassword(password);
    const email = req.body.email;

    const userFound = await db.USER.findOne({where: {email: email}});

    if (userFound) {
        const isPasswordCorrect = await passService.comparePasswords(password, userFound.password);
        if (isPasswordCorrect) {
            const token = tokenService.createToken({userId: userFound.id});
            console.log('connecté');
            return res.status(200).json({message: {id: userFound.id, token: token, pass: true}});
        }
        else {
            console.log('Wrong password.');
            return res.status(200).json({message: {txt:'mauvais password', pass:false}});
        }
    }
    else {
        console.log('User doesn\'t exist.');
        return res.status(200).json({message: {txt:'mauvais email', pass:false}});
    }  
}