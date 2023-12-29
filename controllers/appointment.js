const user = require('../models/User.js')

module.exports = async (req, res) =>{

    res.render('appointment',{
        errors: req.flash('validationErrors')
    });
}