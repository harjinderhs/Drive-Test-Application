const user = require('../models/User.js')
const bcrypt = require("bcrypt");
const appointment = require('./appointment.js');

module.exports = async (req, res) =>{
    
    // console.log(req.session)
    
    const userinfo = await user.findById(req.session.userId).populate("appointmentid")
    const timeSlots = null
    
    res.render('g2_test',{
        userinfo: userinfo,
        timeSlots: timeSlots,
        selectedDate: ""
    });
            
}