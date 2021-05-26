const Model = require('./Model').Model;

class User extends Model{
    
    constructor(params){
        super(params, 'users');
        this.setValues(params);
    }
    static getTable(){
        return 'users';
    }
    setValues(params){
        this.username = params.username
    }
}

module.exports = {User};