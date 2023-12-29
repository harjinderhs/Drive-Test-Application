const appointment = require('../models/Appointment.js')

module.exports = async (req,res)=>{

    const dateAndTime = await appointment.find({
        date: req.body.appointDate,
        time: req.body.appointTime
    })

    console.log(dateAndTime)

    if (dateAndTime.length == 0) {

        appointment.create(
        {
            date: req.body.appointDate,
            time: req.body.appointTime
        })
        .then((result) => {
            res.redirect('/appointment')
        })
        .catch((error) => {
            console.log(error)
            res.redirect('/appointment')
        })
    }
    else {
        req.flash('validationErrors',"the appointmnent slot for the given Date: "+ req.body.appointDate +" and Time: "+ req.body.appointTime +" already created! ")
        return res.redirect('/appointment')
    }

}