const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const CarDetailsSchema = {
    make: { type: String, default: 'Default' },
    model: { type: String, default: 'Default' },
    year: { type: Number, default: '0' },
    plateno: { type: String, default: 'Default'}
};

const UserSchema = new Schema({
    firstname: { type: String, default: 'Default' },
    lastname: { type: String, default: 'Default' },
    license_no: { type: String, default: 'Default'},
    age: { type: Number, default: '0' },
    username: { type: String, required: true, unique: true, required: [true,'Please provide username'] },
    password: { type: String, required: true, required: [true,'Please provide password'] },
    user_type: { type: String, required: true },
    car_details : CarDetailsSchema,
    appointmentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }
});

UserSchema.pre('save', function(next){
    const user = this

    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })

})

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('User',UserSchema);
module.exports = User;