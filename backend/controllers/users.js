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

exports.profile = async (req, res) => {
    const userId = req.userId;

    const id = req.params.id;

    const userFound = await db.USER.findOne({where: {id: id}, include: [db.ADDRESS]});

    if (userFound) {
        let user = {
            userName: userFound.userName,
            lastName: userFound.lastName,
            firstName: userFound.firstName,
            phoneNumber: userFound.phoneNumber,
            email: userFound.email,
            photo: userFound.photo,
            searchingZone: userFound.searchingZone,
        }

        if(userFound.address) {
            user.address = {
                number: userFound.address.number,
                lineA: userFound.address.lineA,
                lineB: userFound.address.lineB,
                zipCode: userFound.address.zipCode,
                city: userFound.address.city,
            }
        }

        return res.status(200).json({message:{user:user}});
    }
    else {
        return res.status(200).json({message:{txt:"utilisateur pas trouvé"}});
    }
}

exports.updateProfile = async(req, res) => {
    const userId = req.userId;

    const userName= req.body.userName;
    const lastName= req.body.lastName;
    const firstName= req.body.firstName;
    const phoneNumber= req.body.phoneNumber;
    const email= req.body.email;
    const photo= req.body.photo;
    const searchingZone= req.body.searchingZone;

    const number= req.body.number;
    const lineA= req.body.lineA;
    const lineB= req.body.lineB;
    const zipCode= req.body.zipCode;
    const city= req.body.city;

    const userFound = await db.USER.findOne({where: {user_id: id}, include: [db.ADDRESS]});

    userFound.userName = userName;
    userFound.lastName = lastName;
    userFound.firstName = firstName;
    userFound.phoneNumber = phoneNumber;
    userFound.email = email;
    userFound.photo = photo;
    userFound.searchingZone = searchingZone;

    let address = db.ADDRESS.build({
        number : number,
        lineA : lineA,
        lineB : lineB,
        zipCode : zipCode,
        city : city,
    });
    await address.save();

    userFound.setAddress(address);
    await userFound.save();

    return res.status(200).json({message: {txt: 'Utilisateur updaté'}});

}