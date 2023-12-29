const appointment = require('../models/Appointment.js')
const user = require('../models/User.js')

module.exports = async (req,res)=>{

    console.log(req.body.bookAppointTimeDateId)

    try {
        await user.updateOne( 
            { _id: req.session.userId },
            {
                $set: {
                        "appointmentid": req.body.bookAppointTimeDateId
                    }
            }
        )

        await appointment.updateOne( 
            { _id: req.body.bookAppointTimeDateId },
            {
                $set: {
                        "isTimeSlotAvailable": false
                    }
            }
        )
        res.redirect('/g2_test')
    }
    catch(error) {
        console.log(error)
        console.log("Error while Booking slot")
        res.redirect('/g2_test')
    }
}