const mongoose = require('mongoose');

mongoose.createConnection('mongodb+srv://<user>:<password>@cluster0-zrsf9.mongodb.net/test?retryWrites=true&w=majority',{
    useCreateIndex : true,
    useNewUrlParser :true,
    useUnifiedTopology : true,
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err) );