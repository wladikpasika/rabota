const nodemailer = require('nodemailer'),
    fs = require('fs'),
    config = JSON.parse(fs.readFileSync('config/confPass.json'));
module.exports = {
    send(body){
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port: 25,
            auth:{
                user: config.email,
                pass: config.pass
            },
            tls:{
                rejectUnauthorized:false
            }
        });
        let HelperOptions = {
            from:'wladikpasika@gmail.com',
            to:'world2016_emig@ukr.net, wladikpasika@gmail.com',
            subject: 'Заявка с сайта',
            text: `Телефон/Email: ${body.phoneEmail}; Имя: ${body.name}`,
        };
        return new Promise((resolve,reject)=>{
            return transporter.sendMail(HelperOptions,(err,info)=>{
                console.log(err, info);
                if(err){
                    return reject(err);
                }
                else{
                    return resolve(info);
                }
            });
        })
    }
};