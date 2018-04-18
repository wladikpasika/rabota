const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoincrement = require('simple-mongoose-autoincrement');

const mainSliderSchema = new Schema({
    title: String,
    description: String,
    background: String,
});
mainSliderSchema.plugin(autoincrement, {field: 'id'});
let newService = mongoose.model('mainSlider', mainSliderSchema);
module.exports.service = newService;
module.exports.createService = function(newService){
        return new Promise((resolve,reject)=>{
                return newService.save((err,result) => {
                    if(err===null){return resolve(result)}
                    else if(err){return reject(err)}
                });
        });
    };
module.exports.findService = function(condition = {}){
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
            //проверяем количество удаленных услуг result.n и успех операции
            if(result&&result.n>0&&err===null){return resolve(result)}
            //услуга не найдена или ошибка удаления
            else if(err||result.n===0){return reject(err)}
        });
    });
};
