const knexfile = require('./knexfile')

const Knex = require('knex')(knexfile)

module.exports = Knex