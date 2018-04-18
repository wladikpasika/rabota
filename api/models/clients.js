const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoincrement = require('simple-mongoose-autoincrement');

const clientsSchema = new Schema({
    big_photo: String,
    small_photo: String,
});
clientsSchema.plugin(autoincrement, {field: 'id'});
let newClient = mongoose.model('clients', clientsSchema);
module.exports.clients = newClient;
module.exports.createClient = function(newClient){
        return new Promise((resolve,reject)=>{
                return newClient.save((err,result) => {
                    if(err===null){return resolve(result)}
                    else if(err){return reject(err)}
                });
        });
    };
module.exports.findClients = function(condition = {}){
    return new Promise((resolve,reject)=>{
        return newClient.find(condition,(err,result) => {
            if(result||err===null){return resolve(result)}
            else if(err){return reject(err)}
        });
    });
};
module.exports.removeClient = function(condition){
    return new Promise((resolve,reject)=>{
        return newClient.remove(condition,(err,result) => {
            //проверяем количество удаленных книг result.n и успех операции
            if(result&&result.n>0&&err===null){return resolve(result)}
            //книга не найдена или ошибка удаления
            else if(err||result.n===0){return reject(err)}
        });
    });
};
