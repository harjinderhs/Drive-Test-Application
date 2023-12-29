const user = require('../models/User.js')

module.exports = async (req,res)=>{
    const userinfo = await user.findById(req.session.userId)

    console.log(req.session)

    if(userinfo.license_no == "Default") {
        res.redirect('/g2_test')
    }
    else {
        res.render('g_test',{
            userinfo: userinfo,
        });
    }
}