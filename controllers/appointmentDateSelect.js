const user = require('../models/User.js')
const appointment = require('../models/Appointment.js')

module.exports = async (req, res) => {

    console.log(req.params.date)

    const userinfo = await user.findById(req.session.userId)
    const timeSlots = await appointment.find({date: req.params.date, isTimeSlotAvailable: true})

    console.log(timeSlots)
    
    res.render('g2_test',{
        userinfo: userinfo,
        timeSlots: timeSlots,
        selectedDate: req.params.date
    });

}