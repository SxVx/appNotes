const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField : 'email',
},async(email,password,done)=>{
    const user = await User.findOne({email:email});
    if(!user){
        //done es un callback que sirve para el proceso de autentificación
        return done(null,false, {message : 'Not User Found'} );
    }else{
        const match = await user.matchPassword(password);
        if(match){
            return done(null,user);
        } else {
            return done(null,false,{message:'Incorrect Password'});
        }
    }
}));

//Lo que hace serialize es tomar un usuario y un callback
passport.serializeUser((user,done)=>{
    //vamos a ejecutar el callback
    done(null. user.id);
});

//Lo que hace esto es tomar el id y genera un usuario para poder usar sus datos
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    });
});