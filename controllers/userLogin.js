const bcrypt = require("bcrypt");
const user = require("../models/User");

module.exports = (req, res) => {

    const { username, password } = req.body;

    if(username && password) {

        user.findOne({ username: username })
        .then((user) => {
            if (user) {
                
                bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id
                    req.session.userType = user.user_type
                    return res.redirect("/")
                } else {   

                    req.flash('validationErrors',"Entered password is incorrect")
                    req.flash('data',req.body)
                    
                    return res.redirect("/login")
                }
                })

            }
            else {
                
                req.flash('validationErrors',"Entered username doesn't exist")
                req.flash('data',req.body)

                return res.redirect("/login")
            }
        })
    }
    else {
        req.flash('validationErrors',"Both values username and password are required")
        req.flash('data',req.body)
        return res.redirect("/login")
    }
    
}
