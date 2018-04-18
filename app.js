const express = require('express'),
    https = require('https'),
    app = express(),
    port = 8082,
    portSsl = 443,
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    expressValidator = require('express-validator'),
    passport = require('passport'),
    path = require('path'),
    mongooseStore = require('./config/connection').mongoose,
    policies = require('./config/policies'),
    fs = require('fs'),
    httpOptions = {
        cert: fs.readFileSync(__dirname+'/ssl/rabota_com_ua/fullchain1.pem'),
        key: fs.readFileSync(__dirname+'/ssl/rabota_com_ua/privkey1.pem')
    },
    ejsLocals = require('ejs-locals');
//мидллвэры для шаблонов
app.engine('ejs', ejsLocals);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.listen(port, function(){
    console.log(`Listening on port ${port}, 443!`);
});
https.createServer(httpOptions, app).listen(portSsl);
//вешаем протокол
/*app.use((req,res,next)=>{
    if(req.protocol ==='http'){
        if(req.url.length>1) {return  res.redirect(301, 'https://'+req.hostname + req.url);}
        else {return  res.redirect(301, 'https://'+req.hostname);}
    }
    return next()
});*/
//парсим тело запроса
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
app.use(cookieParser());
//устанавливаем сессии и настраиваем хранилище
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave: true,
    store: new MongoStore({mongooseConnection:mongooseStore.connection})
}));
/*Инициализация паспорта*/
app.use(passport.initialize());
app.use(passport.session());
/*Подключаем модуль валидации*/
app.use(expressValidator({
    errorFormatter:function(param, msg, value){
        let namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        while(namespace.length){
            formParam += '[' + namespace.shift() +']';
        }
        return{
            param:formParam,
            msg:msg,
            value:value
        }
    }
}));
//настраиваем флэш сообщения
app.use(flash());
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.originalUrl = req.originalUrl;
    next();
});
//статика
app.use('/assets', express.static(__dirname + '/assets'));
//все остальное на роуты
app.use('/', policies);


