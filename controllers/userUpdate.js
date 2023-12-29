const user = require('../models/User.js')

module.exports = async (req,res)=>{
    await user.updateOne( 
        { _id: req.session.userId },
        {
            $set: {
                    "firstname": req.body.firstname,
                    "lastname": req.body.lastname,
                    "license_no": req.body.license_no,
                    "age": req.body.age,
                    "car_details.make": req.body.make,
                    "car_details.model": req.body.model,
                    "car_details.year": req.body.year,
                    "car_details.plateno": req.body.plateno
                }
        }
    )

    res.redirect('/g2_test')
    //console.log(req.body)
}