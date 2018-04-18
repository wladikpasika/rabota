const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoincrement = require('simple-mongoose-autoincrement');

const servicesSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    currency: String,
    img: String,
});
servicesSchema.plugin(autoincrement, {field: 'id'});
let newService = mongoose.model('services', servicesSchema);
module.exports.services = newService;
module.exports.createService = function(){
        return new Promise((resolve,reject)=>{
                return newService.save((err,result) => {
                    if(err===null){return resolve(result)}
                    else if(err){return reject(err)}
                });
        });
    };
module.exports.findServices = function(condition = {}){
    return new Promise((resolve,reject)=>{
        return newService.find(condition,(err,result) => {
            if(result||err===null){return resolve(result)}
            else if(err){return reject(err)}
        });
    });
};
module.exports.removeService = function(condition){
    return new Promise((resolve,reject)=>{
        return newService.remove(condition,(err,result) => {
            //проверяем количество удаленных книг result.n и успех операции
            if(result&&result.n>0&&err===null){return resolve(result)}
            //книга не найдена или ошибка удаления
            else if(err||result.n===0){return reject(err)}
        });
    });
};
