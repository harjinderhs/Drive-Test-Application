const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')

const expressSession = require('express-session');

const mongoose = require('mongoose')

const flash = require('connect-flash');

const homeController = require('./controllers/home')
const g2TestController = require('./controllers/g2Test')
const gTestController = require('./controllers/gTest')
const loginController = require('./controllers/login')
const userLoginController = require('./controllers/userLogin')
const userCreateController = require('./controllers/userCreate')
const signupController = require('./controllers/signup')
const userInfoUpdateController = require('./controllers/userUpdate')
const carDetailsUpdateController = require('./controllers/carDetailsUpdate')
const logoutController = require('./controllers/userLogout')
const appointmentController = require('./controllers/appointment')
const addAppointmentController = require('./controllers/addAppointment')
const appointmentDateSelectController = require('./controllers/appointmentDateSelect')
const bookAppointmentController = require('./controllers/bookAppointment')


const driverAuthMiddleware = require('./middleware/driverAuthMiddleware')
const adminAuthMiddleware = require('./middleware/adminAuthMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

mongoose.connect('mongodb+srv://harjinder07:sunnysingh123@cluster0.mvfmzda.mongodb.net/', {useNewUrlParser: true})

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded())

app.use(expressSession({
    secret: 'keyboard cat'
    }))

app.use(flash());


global.loggedIn = null;
global.loggedUserType = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    loggedUserType = req.session.userType
    next()
});

app.listen(4000, ()=>{
    console.log('App listening on port 4000')

    app.get('/', homeController)
    
    app.get('/g2_test', driverAuthMiddleware, g2TestController)

    app.post('/g2_test/userinfoupdate', driverAuthMiddleware, userInfoUpdateController)

    app.get('/g_test', driverAuthMiddleware, gTestController)

    app.post('/g_test/carupdate', driverAuthMiddleware, carDetailsUpdateController)

    app.get('/login', redirectIfAuthenticatedMiddleware, loginController)

    app.post('/login/userauth', redirectIfAuthenticatedMiddleware, userLoginController)

    app.get('/signup', redirectIfAuthenticatedMiddleware, signupController )

    app.post('/signup/usercreate', redirectIfAuthenticatedMiddleware, userCreateController )

    app.get('/appointment', adminAuthMiddleware, appointmentController)

    app.post('/appointment/addappointment', adminAuthMiddleware, addAppointmentController)

    app.post('/g2_test/bookappointment', driverAuthMiddleware, bookAppointmentController)    
    
    app.get('/g2_test/appointdate/:date', driverAuthMiddleware, appointmentDateSelectController)

    app.get('/logout', logoutController)

    app.use((req, res) => res.render('notfound'));

})


