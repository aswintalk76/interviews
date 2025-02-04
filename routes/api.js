var express = require('express');
var router = express.Router();
const middleware = require('.././middleware/Auth')
var api = require("../controllers/api/apiController")

router.post("/signup_user", api.signup_user)    
router.post("/login", api.login)
router.post("/social_login", api.social_login)
router.post("/forgotPassword", api.forgotPassword)
router.post("/otp_verify", api.otp_verify)
router.post("/resend_otp", api.resend_otp)


router.get("/privacy_policy", api.privacy_policy)
router.get("/terms_and_condition", api.terms_and_condition)
router.get("/about_us", api.about_us)

router.use(middleware.Auth)

//user auth route
// router.get("/user_list", api.user_list)
router.post("/edit_profile", api.edit_profile)
router.get("/get_profile", api.get_profile)
router.put("/change_password", api.change_password)



router.post("/logout", api.logout)



module.exports = router;
