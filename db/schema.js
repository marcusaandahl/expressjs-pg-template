var migartionCreateUsers = require('./migrations/20210523182614_create_users');
// IMPORT MIGRATIONS


async function schema(){
    var debug = require('debug')(process.env.APP_NAME+':schema:');
    //RUNS ALL MIGRATIONS
    await migartionCreateUsers.migrate();
    process.exit();
}

async function reset(){
    var db = require('./db.js');
    //DROPS ALL TABLES IN DATABASE
    var queryS = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;";
    var query = "DROP SCHEMA public CASCADE; CREATE SCHEMA public AUTHORIZATION postgres; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;";
    await db.queryA(query, [], "ALL TABLES RESET");
    process.exit();
}

module.exports = {migrate: schema, reset};