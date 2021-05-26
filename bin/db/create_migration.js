/*

    CREATES MIGRATION FILE TEMPLATE WHEN 'yarn newMigr migration_name' IS RUN

*/

var fs = require('fs');
require('dotenv').config();
var debug = require('debug')(process.env.APP_NAME+':migrations:');

var commandArr = process.argv;
commandArr.splice(0,2);
var regexFileName = new RegExp('^[a-zA-Z]+$', 'g'); //no special chars
var regexMigrName = new RegExp('^.', 'g'); //selects first letter
var fileName = '';
var migrName = '';

var today = new Date();

//GETS TIMESTAMP
var timestamp = () => {
    var year = today.getUTCFullYear().toString(10);
    var month = (today.getUTCMonth()+1).toString(10);
    if (month.length<=1) { month= '0' + month};
    var day = today.getUTCDate().toString(10);
    if (day.length<=1) { day= '0' + day};
    var hour = today.getUTCHours().toString(10);
    if (hour.length<=1) { hour= '0' + hour};
    var minute = today.getUTCMinutes().toString(10);
    if (minute.length<=1) { minute= '0' + minute};
    var second = today.getUTCSeconds().toString(10);
    if (second.length<=1) { second= '0' + second};

    return year+month+day+hour+minute+second
};

//CREATES FILE AND MIGRATION NAMES
commandArr.forEach((element, index) => {
    if (element != regexFileName) {
        fileName = fileName+'_'+element.toLowerCase();
        migrName = migrName+element.replace(regexMigrName, element[0].toUpperCase());
    } else {
        throw new Error('File name format not accepted');
    }
});

fileName = timestamp()+fileName;

// CREATES MIGRATION FILE + ADDS IMPORT TO SCHEMA
fs.appendFile('./db/migrations/'+fileName+'.js',
`var db = require('../db.js');
var migrationName = '${migrName}';
/* QUERY EXAMPLES
const createUsersQ = 'CREATE TABLE IF NOT EXISTS public.users (id serial,username CHAR(25) NOT NULL, PRIMARY KEY (id));';
const selectUser = 'SELECT id, username FROM users WHERE id=1;';
*/

const table = 'DB_TABLE';
const query = 'INPUT YOUR QUERY';
const params = [];
consoleResponse = '';

async function migrate() {
    var debug = require('debug')(process.env.APP_NAME+':${migrName}:');
    var response = await db.queryA(query, params, consoleResponse);

    debug(consoleResponse);
}

module.exports = {migrate};`
, function (err) {
    if (err) throw debug('ERROR CREATING MIGRATION', err.stack);
    updateSchemaFile();
    debug('Created migration successfully');
});

function updateSchemaFile(){
    var schemaFileContent = fs.readFileSync('./db/schema.js','utf8');
    var newSchemaFileContent =
`var migartion${migrName} = require('./migrations/${fileName}');
${schemaFileContent}`;
    fs.writeFile('./db/schema.js',newSchemaFileContent,
    function (err) {
        if (err) throw debug('ERROR CREATING MIGRATION', err.stack);
    });
}