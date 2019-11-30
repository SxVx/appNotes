const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb+srv://<<user>>:<<password>>@cluster0-zrsf9.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err) );