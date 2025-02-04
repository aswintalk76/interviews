var db = require('../models');
const uuid = require('uuid').v4;
const path = require('path')

module.exports = {
    userlist: async (req, res) => {
        try {
            if (!req.session.user) return res.redirect('/login')
            console.log('>>>>>>>>>>>>>>>>>>>>>>>fdgdsgd>>>>>>');
            var data = await db.users.findAll({
                Order: [
                    ['name', 'Desc']
                ],
                raw: true,
            })
            res.render("users/index", { data, session: req.session, title: 'user_active', msg: req.flash('msg') })
        } catch (err) {
            console.log('errr>>>>>>>>>>>', err);
        }
    },
    userview: async (req, res) => {
        if (!req.session.user) return res.redirect('/login')
        try {
            const view = await db.users.findOne({
                where: {
                    id: req.params.id
                }
            })
            res.render("users/view", { view, session: req.session, title: 'view_active', msg: req.flash('msg') })
        } catch (error) {
            console.log(">>>>>>>>>>>>>", error)
        }
    },
    ////

    usercourse: async (req, res) => {
        try {
            if (!req.session.user) return res.redirect('/login')
            console.log('>>>>>>>>>>>>>>>>>>>>>>>fdgdsgd>>>>>>');
            var data = await db.user_buy_course.findAll({
                attributes: [`id`, `course_id`, `user_id`, `certificate`, `created`, `updated`, `createdAt`, `updatedAt`,
                [db.sequelize.literal(
                    'IFNULL((SELECT name from course WHERE course.id = 	course_id ),"")'),  "course_name"],
                ],
                where: {
                    user_id: req.params.id
                },
                Order: [
                    ['id', 'Desc']
                ],
                raw: true,
            })
            // console.log(data)
            // return
            res.render("users/usercourse", { data, session: req.session, title: 'usercourse_active', msg: req.flash('msg') })
        } catch (err) {
            console.log('errr>>>>>>>>>>>', err);
        }
    },
    userstatus: async (req, res) => {
        var check = await db.users.update({
            status: req.body.value,
        }, {
            where: {
                id: req.body.id,
            },
        });
        if (check) {
            req.flash('msg', "User Status-Updated ")
            res.send(false)
        }
    },
}   