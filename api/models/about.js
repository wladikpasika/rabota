const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoincrement = require('simple-mongoose-autoincrement');

const aboutSchema = new Schema({
    title: String,
    description: String,
    text: String,
});
aboutSchema.plugin(autoincrement, {field: 'id'});
let newAbout = mongoose.model('about', aboutSchema);
module.exports.about = newAbout;
module.exports.createAbout = function(){
    return new Promise((resolve,reject)=>{
        return newAbout.save((err,result) => {
            if(err===null){return resolve(result)}
            else if(err){return reject(err)}
        });
    });
};
module.exports.findAbout = function(condition){
    return new Promise((resolve,reject)=>{
        return newAbout.find(condition,(err,result) => {
            if(result||err===null){return resolve(result)}
            else if(err){return reject(err)}
        });
    });
};
module.exports.removeAbout = function(condition){
    return new Promise((resolve,reject)=>{
        return newAbout.remove(condition,(err,result) => {
            //проверяем количество удаленных книг result.n и успех операции
            if(result&&result.n>0&&err===null){return resolve(result)}
            //книга не найдена или ошибка удаления
            else if(err||result.n===0){return reject(err)}
        });
    });
};
