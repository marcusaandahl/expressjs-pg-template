require('dotenv').config();
var debug = require('debug')(process.env.APP_NAME+':db:');
const { Pool } = require('pg');
const Client = require('pg-native');

const client = new Client();
const pool = new Pool();

pool.connect((err) => {
    if (err) {
        return console.error(debug('Error connecting'), err.stack);
    }
    client.connectSync();
    debug('CONNECTED POOL & CLIENT SUCCESSFULLY');
});

async function queryA(query, params, consoleResponse){
        var debugQuery = require('debug')(process.env.APP_NAME+':db:query:');
        return res = await new Promise(resp=> {
            pool.query(query, params)
            .then(res => {
                if (consoleResponse) {debugQuery(consoleResponse)};
                if ('rows' in res) {
                    if (res.rows.length == 1){
                        resp(res.rows[0]);
                    } else {resp(res.rows);}
                };
            })
            .catch(err => {if (err) { resp(err) }});
        });
};

function queryS(query, params, consoleResponse){
    var debugQuery = require('debug')(process.env.APP_NAME+':db:query:');
    try {
        var res = client.querySync(query, params);
    } catch (error) {
        debugQuery(`ERROR WITH QUERY '${query}' \n ${error.stack}`);
        return error;
    }
    if (res) {
        debugQuery(consoleResponse);
        return res;
    }
}

module.exports = {
    queryA,
    queryS,
    pool
};