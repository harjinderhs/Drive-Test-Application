const user = require('../models/User.js')



module.exports = async (req,res)=>{

    var username = ""
    var password = ""
    var cnfPassword = ""

    const data = req.flash('data')[0]

    console.log(req.flash('data'))

    if (typeof data != "undefined") {
        username = data.uname
        password = data.pass
        cnfPassword = data.cnfpass
    }

    res.render('login_signup',{
        errors: req.flash('validationErrors'),
        username: username,
        password: password,
        cnfPassword : cnfPassword,
        flag: false
    });

}