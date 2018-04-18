const mocha = require('mocha');
const assert = require('assert');
const User = require('../api/models/clients').clients;


describe('Сохранение данных',()=>{
    it('Запись данных в базу данных - колллекция User',(done)=>{
        let char = new User({
            big_photo: '/assets/img/clients/3-3.jpg',
            small_photo: '/assets/img/clients/3-3-1.jpg',
        });

        char.save().then((result)=>{
            console.log(result,'Ответ от базы дынных есть');
            assert(char.isNew === false);
            done();
        });
    })
});