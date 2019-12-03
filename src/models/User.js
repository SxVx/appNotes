const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name : { type : String, required : true },
    email : { type: String, required : true },
    password : { type : String, required : true },
    date : { type : Date, default : Date.now },
});

UserSchema.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password,salt);
    return hash;
};

/*No utilizamos las funciones flecha por que estas pierden el scope
 las funciones normales si pueden acceder al this del objeto*/
UserSchema.methods.matchPassword = async function(password){
    //una contraseña es la que se pasa por parametro y la this hace referencia al objeto
    return await bcrypt.compare(password,this.password);
}

module.exports = mongoose.model('User',UserSchema);