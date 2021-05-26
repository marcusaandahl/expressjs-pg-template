var db = require('../db.js');
var migrationName = 'CreateUsers';
/* QUERY EXAMPLES
const createUsersQ = 'CREATE TABLE IF NOT EXISTS public.users (id serial,username CHAR(25) NOT NULL, PRIMARY KEY (id));';
const selectUser = 'SELECT id, username FROM users WHERE id=1;';
*/

const table = 'users';
const createUsersQ = `CREATE TABLE IF NOT EXISTS public.${table} (id serial,username CHAR(25) NOT NULL, PRIMARY KEY (id));`;
const params = [];
const consoleResponse = "CREATED USERS TABLE";

async function migrate() {
    var debug = require('debug')(process.env.APP_NAME+':CreateUsers:');
    await db.queryA(createUsersQ, params, consoleResponse);

    debug(consoleResponse);
}

module.exports = {migrate};