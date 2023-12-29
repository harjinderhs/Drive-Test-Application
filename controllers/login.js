const user = require('../models/User.js')

module.exports = async (req, res) =>{

    var username = ""
    var password = ""

    const data = req.flash('data')[0]

    if (typeof data != "undefined") {
        username = data.username
        password = data.password
    }   

    console.log(req.flash('data'))

    res.render('login_signup',{
        errors: req.flash('validationErrors'),
        username: username,
        password: password,
        flag: true
    });
}