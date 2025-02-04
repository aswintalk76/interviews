var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin')
var cmsController = require('../controllers/cms')
var dashboardController = require('../controllers/dashboard')
var userController = require('../controllers/user')

/////////////////dashbooard//////////////////////////
router.get('/dashboard', dashboardController.dashboard)

///////////login////////////////////////////////////
router.get('/', adminController.login)
router.get('/login', adminController.login)
router.post('/inlogin', adminController.adminlogin)
router.get('/logout', adminController.adminlogout)

///////////////// CMS////////////////////
router.get("/termconditions", cmsController.terms)
router.post('/updateterms', cmsController.update)
router.get("/privacy", cmsController.policy)
router.post('/updateprivacy', cmsController.policy_update)
router.get("/aboutus", cmsController.about)
router.post('/updateabout', cmsController.update_about)


///////////////////admin////////////////////////////
router.get('/changepassword', adminController.changepassword)
router.post("/changed", adminController.passwordchange)
router.get('/profile', adminController.profile)
router.post("/update", adminController.postprofile)

//////////////users////////////////////////  
router.get("/users", userController.userlist)
router.get("/viewuser/:id", userController.userview)
router.get("/usercourse/:id", userController.usercourse)

router.post("/userstatus", userController.userstatus);

module.exports = router;
