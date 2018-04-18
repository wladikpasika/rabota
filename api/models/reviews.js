const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoincrement = require('simple-mongoose-autoincrement');

const reviewSchema = new Schema({
    name: String,
    review: String,
    src: String,
    src_type: String,
    social_link: String,
    type_social: String,
});
reviewSchema.plugin(autoincrement, {field: 'id'});
let newReview = mongoose.model('review', reviewSchema);
module.exports.review = newReview;
module.exports.createReview = function(newReview){
        return new Promise((resolve,reject)=>{
                return newReview.save((err,result) => {
                    if(err===null){return resolve(result)}
                    else if(err){return reject(err)}
                });
        });
    };
module.exports.findReviews = function(condition = {}){
    return new Promise((resolve,reject)=>{
        return newReview.find(condition,(err,result) => {
            if(result||err===null){return resolve(result)}
            else if(err){return reject(err)}
        });
    });
};
module.exports.removeReview = function(condition){
    return new Promise((resolve,reject)=>{
        return newReview.remove(condition,(err,result) => {
            //проверяем количество удаленных книг result.n и успех операции
            if(result&&result.n>0&&err===null){return resolve(result)}
            //книга не найдена или ошибка удаления
            else if(err||result.n===0){return reject(err)}
        });
    });
};
