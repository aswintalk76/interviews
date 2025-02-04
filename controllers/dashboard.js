const db = require("../models")
module.exports = {

    dashboard: async (req, res) => {
    if(!req.session.user) return res.redirect('/login')
    const usercount = await db.users.count();
    // const usercount = 5
        res.render("dashboard",{usercount,session:req.session, msg: req.flash('msg'),title:'dashboard_active'})

    }
}