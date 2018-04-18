const findBooks = require('../models/BookList').findBooks;


module.exports = {

    homepage(req,res,next){
        res.render('homepage');
    },

    loginPage(req,res,next){
        res.render('login-page');
    },

    registration(req,res,next){
        res.render('registration')
    },

    user(req,res,next){
        return  findBooks({}).then(books =>{
            res.locals.books = books;
            res.render('user-page');

        }).catch(err => {
            res.locals.books = [];
            req.flash('error', [{msg:err}]);
            return err;
        });
    },
    addBook(req,res,next){
        res.render('add');
    }
};