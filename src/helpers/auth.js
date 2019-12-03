const helpers = {};

helpers.isAuthenticated = (req,res, next) => {
    if(req.isAuthenticated()){ //Si el usuario esta autentificado
        return next();
    }
    req.flash('error_msg','Not Authorized');
    res.redirect('/users/signin');
};

module.exports = helpers;