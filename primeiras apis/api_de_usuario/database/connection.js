var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '135790',
      database : 'tropadigital'
    }
  });

module.exports = knex