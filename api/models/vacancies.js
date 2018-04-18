const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoincrement = require('simple-mongoose-autoincrement');

const vacanciesSchema = new Schema({
    positions: Number,
    city: String,
    when: String,
    experience: String,
    schedule: Number,
    description: String,
    accomodation: String,
    lang: String,
    tags: []

});
vacanciesSchema.plugin(autoincrement, {field: 'id'});
let newVacancy = mongoose.model('vacancies', vacanciesSchema);
module.exports.vacancies = newVacancy;
module.exports.createVacancy = function(newVacancy){
        return new Promise((resolve,reject)=>{
                return newVacancy.save((err,result) => {
                    if(err===null){return resolve(result)}
                    else if(err){return reject(err)}
                });
        });
    };
module.exports.findVacancy = function(condition = {}){
    return new Promise((resolve,reject)=>{
        return newVacancy.find(condition,(err,result) => {
            if(result||err===null){return resolve(result)}
            else if(err){return reject(err)}
        });
    });
};
module.exports.removeVacancy = function(condition){
    return new Promise((resolve,reject)=>{
        return newVacancy.remove(condition,(err,result) => {
            //проверяем количество удаленных книг result.n и успех операции
            if(result&&result.n>0&&err===null){return resolve(result)}
            //книга не найдена или ошибка удаления
            else if(err||result.n===0){return reject(err)}
        });
    });
};
