const routes = require('./routes');

module.exports = function(req, res, next) {
    console.log(req.originalUrl);
    if(   req.originalUrl==='/'
          ||req.originalUrl==='/registration'
          ||req.originalUrl==='/login'
          ||req.isAuthenticated()
          ||req.method === "POST"
          ||req.originalUrl.search(/utm_/i)!==-1/*это ссылки с параметрами от контекста*/
          ||req.query.gclid/*Это ссылки с параметрами от медийной рекламы*/
          ||req.query.slider
    )
    {
        return routes(req, res, next)
    }
  else if(!req.isAuthenticated()){
        req.flash('error', [{msg:'Сначала ввойдите в систему'}]);
        return res.redirect('/')
  }
};
