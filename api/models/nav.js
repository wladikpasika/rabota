const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoincrement = require('simple-mongoose-autoincrement');

const navSchema = new Schema({
    title: String,
    link: String,
});
navSchema.plugin(autoincrement, {field: 'id'});
let newNav = mongoose.model('nav', navSchema);
module.exports.nav = newNav;
module.exports.createNav = function(newNav){
        return new Promise((resolve,reject)=>{
                return newNav.save((err,result) => {
                    if(err===null){return resolve(result)}
                    else if(err){return reject(err)}
                });
        });
    };
module.exports.findNavs = function(condition = {}){
    return new Promise((resolve,reject)=>{
        return newNav.find(condition,(err,result) => {
            if(result||err===null){return resolve(result)}
            else if(err){return reject(err)}
        });
    });
};
module.exports.removeNav = function(condition){
    return new Promise((resolve,reject)=>{
        return newNav.remove(condition,(err,result) => {
            //проверяем количество удаленных книг result.n и успех операции
            if(result&&result.n>0&&err===null){return resolve(result)}
            //книга не найдена или ошибка удаления
            else if(err||result.n===0){return reject(err)}
        });
    });
};
