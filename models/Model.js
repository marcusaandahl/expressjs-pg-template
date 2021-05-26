var db = require('../db/db');

class Model {
    constructor(Iparams, table){
        var params = Iparams;
        var id;
        if (params.id != null) {
            id = params.id;
            delete params.id;
        }
        if (id) {this.id = id}
        for (const prop in params) {
            if (params[prop].constructor === String){
                params[prop] = params[prop].trim();
            }
        }
        this.params = params;
        this.table = table;
    }

    static find(id){
        var query = `SELECT * FROM public.${this.getTable()} WHERE id=${id} ORDER BY id;`;
        var res = db.queryS(query, [], `RECIEVED ROW FROM TABLE ${this.getTable()} WITH ID ${id}`);
        return new this(res[0]);
    }
    async update(newParams){
        var setQ = '';
        for (const property in newParams) {
            if(!(Object.keys(this.params).includes(property))) {
                console.log('invalid new parameters');
                process.exit();
            }
            setQ += `${property} = '${newParams[property]}', `
        }
        setQ = setQ.substring(0, setQ.length-2);
        this.params = {...this.params, ...newParams}
        var query = `UPDATE public.${this.table} SET ${setQ} WHERE id=${this.id};`;
        await db.queryA(query, [], `UPDATED ROW FROM TABLE ${this.table} WITH ID ${this.id}`).then(this.setValues(this.params));
    }
    static delete (id){
        var query = `DELETE FROM public.${this.getTable()} WHERE id=${id};`;
        db.queryA(query, [], `DELETED ROW FROM TABLE ${this.getTable()} WITH ID ${id}`);
    }
    delete(){
        var query = `DELETE FROM public.${this.table} WHERE id=${this.id};`;
        db.queryA(query, [], `DELETED ROW FROM TABLE ${this.table} WITH ID ${this.id}`).then(this.deleted = true);
    }
    async save(){
        if (!((this.id != undefined) && (this.deleted == false))){
            var query = `INSERT INTO public.${this.table}(${Object.keys(this.params).join(', ')}) VALUES ('${Object.values(this.params).join("', '")}') RETURNING id;`;
            await db.queryA(query, [], `CREATED NEW ROW IN TABLE ${this.table}`)
                .then(res => {
                    this.id = res.id;
                    this.deleted = false;
                    }
            );
        } else { console.log('Already Created')}
    }
    static getAll(){
        var query = `SELECT * FROM public.${this.getTable()};`;
        return db.queryS(query, [], `RECIEVED ALL FROM TABLE ${getTable()}`);
    }
}

module.exports = {Model};