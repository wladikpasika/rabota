const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoincrement = require('simple-mongoose-autoincrement');

const contactsSchema = new Schema({
    firm_name: String,
    description: String,
    phones: String,
    skype: String,
    viber: String,
    e_mail: String,
});
contactsSchema.plugin(autoincrement, {field: 'id'});
let newContact = mongoose.model('contacts', contactsSchema);
module.exports.contacts = newContact;
module.exports.createContact = function(newContact){
    return new Promise((resolve,reject)=>{
        return newContact.save((err,result) => {
            if(err===null){return resolve(result)}
            else if(err){return reject(err)}
        });
    });
};
module.exports.findContacts = function(condition = {}){
    return new Promise((resolve,reject)=>{
        return newContact.find(condition,(err,result) => {
            if(result||err===null){return resolve(result)}
            else if(err){return reject(err)}
        });
    });
};
module.exports.removeContact = function(condition){
    return new Promise((resolve,reject)=>{
        return newContact.remove(condition,(err,result) => {
            //проверяем количество удаленных книг result.n и успех операции
            if(result&&result.n>0&&err===null){return resolve(result)}
            //книга не найдена или ошибка удаления
            else if(err||result.n===0){return reject(err)}
        });
    });
};
