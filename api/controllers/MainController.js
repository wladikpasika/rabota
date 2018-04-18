const userModel = require('../models/User').user,
    bookModel = require('../models/BookList').bookList,
    createUser = require('../models/User').createUser,
    createBook = require('../models/BookList').createBook,
    removeBook = require('../models/BookList').removeBook,
    main_slider = require('../models/mainSlider').findService,
    block_services = require('../models/blockServices').findServices,
    nav = require('../models/nav').findNavs,
    reviews = require('../models/reviews').findReviews,
    clients = require('../models/clients').findClients,
    about = require('../models/about').findAbout,
    contacts = require('../models/contacts').findContacts,
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    comparePassword = require('./helpers/loginCheck'),
    nodemailer = require('../../config/nodemailer');

//вынес, все что можно вынести с объекта
passport.serializeUser((user, done)=>{done(null, user.id)});
passport.deserializeUser((id, done)=>{
    userModel.findOne({id:id}).then((resolve)=>{done(null, resolve)},(reject)=>{done(reject)});
});
module.exports = {
    registration(req,res,next){
        let email = req.body.email,
            login = req.body.login,
            password = req.body.password,
            rePassword = req.body.rePassword;
        //Валидация наших данных c тела запроса
        req.checkBody('login', 'Пустое поле логин').notEmpty();
        req.checkBody('email', 'Пустое поле email').notEmpty();
        req.checkBody('password', 'Пустое поле пароль').notEmpty();
        req.checkBody('rePassword', 'Пароли не совпадают').equals(req.body.password);
        let errors = req.validationErrors();
        if (errors) {
            req.flash('error', errors);
            return res.redirect('/registration');
        }
        let newUser = new userModel({
            'login': login,
            'email': email,
            'password': password
        });
        createUser(newUser).then(()=>{
            req.flash('success_msg', 'Вы зарегистрированы');
            return res.redirect('/login');
        }).catch(err => {
            req.flash('error', [{msg:JSON.stringify(err)}]);
            return res.redirect('/registration');
        });
    },
    login(req, res, next){
        req.checkBody('email', 'Пустое поле email').notEmpty();
        req.checkBody('password', 'Пустое поле пароль').notEmpty();
        let errors = req.validationErrors();
        if (errors) {
            req.flash('error', errors);
            return res.redirect('/login');
        }
        ///настройка паспорта
        passport.use(new LocalStrategy({usernameField:'email', passwordField: 'password'},
            function(username, password, done){
                comparePassword(username, password).then(result => {
                    return done(null, result)}).catch((err)=>{
                    req.flash('error', [{msg:err}]); return done(null,false)})
            }
        ));

        function autotentification (req, res, next) {
            passport.authenticate('local', function(err, user, info) {
                if (err) {
                    return next(err)
                }
                req.logIn(user, function(err) {
                    if (err) {
                        return res.redirect('/login');//next(err)
                    }
                    else{
                        res.redirect(`/user/${user.id}`)
                    }
                });
            })(req, res, next);
        };
        return autotentification(req, res, next);
    },
    logout(req, res, next){
        req.logout(req.user);
        if(!req.user) {
            req.flash('success_msg', 'Зря Вы это сделали');
           return  res.redirect('/login')
        }
        else {return res.redirect('/users/main')}
    },
    addBook(req, res, next){
        req.checkBody('title', 'Пустое поле \'Название книги\'').notEmpty();
        req.checkBody('author', 'Пустое поле \'Автор\'').notEmpty();
        req.checkBody('year', 'Пустое поле \'Год\'').notEmpty();
        let errors = req.validationErrors();
        if (errors) {
            req.flash('error', errors);
            return res.redirect(`/user/${req.user.id}`);
        }
        let newBook = new bookModel({
            'title': req.body.title,
            'year': req.body.year,
            'author': req.body.author,
        });

        createBook(newBook).then(book =>{
            req.flash('success_msg', `Вы Добавили книгу ${book.title}`);
            return res.redirect(`/user/${req.user.id}`);
        }).catch(err => {
            req.flash('error', [{msg:JSON.stringify(err)}]);
            return res.redirect(`/user/${req.user.id}`);
        });
    },
    deleteBook(req, res, next){
       return removeBook({id:req.param('id')}).then(result => {
            req.flash('success_msg', `Вы удалили книгу`);
            res.redirect(`/user/${req.user.id}`);
        }).catch(err =>{
            req.flash('error', [{msg:JSON.stringify(err)}]);
            return res.redirect(`/user/${req.user.id}`);
        })
    },
    sliderQuery(req,res,next){
        switch (req.query.slider) {
            case 'main_slider':
                main_slider().then(result => {return res.send(result)}).catch(err => {
                    return next()});
                break;
            case 'block_services':
                block_services().then(result => {return res.send(result)}).catch(err => {
                    return next()});
                break;
            case 'nav':
                nav().then(result => {return res.send(result)}).catch(err => {
                    return next()});
                break;
            case 'reviews':
                reviews().then(result => {return res.send(result)}).catch(err => {
                    return next()});
                break;
            case 'clients_block':
                clients().then(result => {return res.send(result)}).catch(err => {
                    return next()});
                break;
            case 'about':
                about().then(result => {return res.send(result)}).catch(err => {
                    return next()});
                break;
            case 'contacts':
                contacts().then(result => {return res.send(result)}).catch(err => {
                    return next()});
                break;
            default:{ next()}
        }
    },
    sendMail(req,res,next){
        return nodemailer.send(req.body).then(result =>{return res.send(200)}).catch(err =>{
            return next()
        });
    }
};
