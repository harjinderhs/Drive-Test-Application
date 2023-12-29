const user = require('../models/User.js')

module.exports = (req,res)=>{

    if(req.body.pass === req.body.cnfpass) {

        user.create(
        {
            username: req.body.uname,
            password: req.body.pass,
            user_type: req.body.usertype
        })
        .then((result) => {
            res.redirect('/login')
        } )
        .catch(
            (error) => {

                if (error.name === 'ValidationError') {
                    const validationErrors = Object.values(error.errors).map(err => err.message);
                    req.flash('validationErrors',validationErrors)
                    req.flash('data',req.body)
                    
                    console.log(error)
                    return res.redirect('/signup')
                } else {
                    // Handle other types of errors (e.g., database connection issues)
                    console.error(error);
                    return res.status(500).send('Internal Server Error');
                }
            }
        )
        //console.log(req.body)
    }
    else {
        req.flash('validationErrors',"Password and confirm password do not match, Enter the same password.")
        req.flash('data',req.body)
        return res.redirect('/signup')
        
    }
}