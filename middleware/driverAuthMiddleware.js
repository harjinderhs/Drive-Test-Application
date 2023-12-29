const user = require('../models/User')

module.exports = (req, res, next) => {
    
    user.findById(req.session.userId)
    .then( (user) =>{

        //console.log(user)
        if(!user || req.session.userType != "Driver"){
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