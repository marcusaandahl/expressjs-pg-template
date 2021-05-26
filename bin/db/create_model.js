/*

    CREATES MODEL FILE TEMPLATE WHEN 'yarn newMod model_name' IS RUN

*/

var fs = require('fs');
require('dotenv').config();
var debug = require('debug')(process.env.APP_NAME+':models:');

debug('CREATING MODEL FILE');

var commandArr = process.argv;
commandArr.splice(0,2);

var modelName = '';
var regexFileName = new RegExp('^[a-zA-Z]+$', 'g'); //no special chars
var regexModelName = new RegExp('^.', 'g'); //selects first letter

if (commandArr.length != 1) {
    throw new Error((debug('MODEL NAME CAN ONLY BE ONE WORD')));
} else if (regexFileName==commandArr[0]){
    throw new Error((debug('MODEL NAME CAN NOT HAVE SPECIAL CHARACTERS')));
} else {
    modelName = commandArr[0].replace(regexModelName, commandArr[0][0].toUpperCase());
    if (fs.existsSync(`./models/${modelName}.js`)) {
        throw new Error((debug('MODEL ALREADT EXISTS')));
    } else {
        fs.writeFile(`./models/${modelName}.js`,
        `const Model = require('./Model').Model;

        class ${modelName} extends Model{
            
            constructor(params){
                super(params, 'YOUR_DB_TABLE_NAME_FOR_MODEL(SEE MIGRATION DOCS)');
                this.setValues(params);
            }
            static getTable(){
                return 'YOUR_DB_TABLE_NAME_FOR_MODEL(SEE MIGRATION DOCS)';
            }
            setValues(params){
                this.VALUE = params.VALUE //SET YOUR MODEL PARAMETERS IN SYNC WITH MIGRATION/DB TABLE
            }
        }
        
        module.exports = {${modelName}};`
        , function(err){throw new Error(debug('ERROR CREATING MODEL'), err.stack)})
    }
}
process.exit();