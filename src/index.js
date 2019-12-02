const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); //motor de plantillas
const methodOverride = require('method-override'); //extiende funcionalidades de formulario
const session = require ('express-session'); //es una manera para guardar los datos de los usuarios
const flash = require('connect-flash'); //Sirve para mandar multiples vistas
const passport = require('passport');
// Initiliazations
const app = express();
require('./database');
require('./config/passport');

// Settings
app.set('port',process.env.PORT || 4200);
const PORT = app.get('port');
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout : 'main',
    layoutsDir : path.join(app.get('views'),'layouts') ,
    partialsDir : path.join(app.get('views'), 'partials') ,
    extname: '.hbs',
}));
app.set('view engine','hbs');

// Middlewares
app.use(express.urlencoded({extended:false}));
//vamos a agregar un input oculto con '_method' para los otros metodos aparte de post y get
app.use(methodOverride('_method'));

//Nos va a permiter autentificar el usuario y almacenar esos datos temporalmente
app.use(session({
    secret : 'mysecretseeder',
    resave : true,
    saveUninitialized : true
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global Variables
app.use((req,res,next)=>{
    /*Necesitamos una forma de compartir mensajes entre las vistas que podemos manejar con flash*/
    //Declaramos variables de forma globas
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static Files
app.use(express.static(path.join(__dirname,'public')));

// Server is listenning
app.listen(PORT,()=>{
    console.log(`Server run in port ${PORT}`);
});