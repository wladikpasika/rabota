const routes = require('./routes');

module.exports = function(req, res, next) {
    if(
          req.originalUrl==='/registration'
          ||req.originalUrl==='/login'
          ||req.method === "POST"
          ||req.originalUrl.search(/utm_/i)!==-1/*это ссылки с параметрами от контекста*/
          ||req.query.gclid/*Это ссылки с параметрами от медийной рекламы*/
          ||req.query.slider
          ||req.originalUrl==='/'
          ||req.isAuthenticated()
    )
    {
        return routes(req, res, next)
    }
  else if(!req.isAuthenticated()){
        req.flash('error', [{msg:'Сначала ввойдите в систему'}]);
        return res.redirect('/')
  }
};
