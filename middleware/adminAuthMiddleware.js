const user = require('../models/User')

module.exports = (req, res, next) => {
    
    user.findById(req.session.userId)
    .then( (user) =>{

        if(!user || req.session.userType != "Admin"){
            return res.redirect('/')
        }
        next()

    })
    .catch(
        (error) =>{

            console.log(error)
            return res.redirect('/')

    })
}