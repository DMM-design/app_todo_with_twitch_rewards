// Library
const knex = require('knex');
const knexConfig = require('../knexfile');

// configuration variables
const env = process.env.NODE_ENV || 'development';
const config = knexConfig[env];


const connection = knex(config);
module.exports = connection;

