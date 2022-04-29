require('dotenv').config();

const { Sequelize } = require('sequelize');
const express = require('express');
const cors = require('cors');


const user = process.env.SQL_USER;
const pass = process.env.SQL_PASS;
const cluster = process.env.SQL_URL;
const db = process.env.SQL_DB;
const origin = process.env.ORIGIN;



const sequelize  = new Sequelize(db,user,pass,{
    host: cluster,
    dialect: mysql
});

// const usersRoutes = require('./routes/users');
// const trajetsRoutes = require ('./routes/trajet');

const app = express();

app.use(express.json());

app.use(cors({
    origin: origin
}));

app.use('/ping', (req, res)=>{
    res.status(200).send("CA MARCHE !");
});

module.exports = app;