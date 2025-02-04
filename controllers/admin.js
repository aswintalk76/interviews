var db = require('../models');
const bcrypt = require("bcrypt");
const path = require('path')
const uuid = require('uuid').v4;
const fs = require('fs');

module.exports = {
	login: async (req, res) => {
		if (req.session.user) return res.redirect('/dashboard')
		try {
			res.render("admin/login", {
				session: req.session,
				msg: req.flash('msg')
			})
		} catch (error) {
			console.log(">>>>>>>>>>>>>>", error)
		}
	},
	adminlogin: async (req, res) => {
		try {
			const {
				email,
				password
			} = req.body
			const adminlogin = await db.login.findOne({
				where: {
					email: req.body.email,
				}
			})
			if (adminlogin == null) {
				req.flash('msg', 'Email and password is incorrect')
				res.redirect('login')
			} else {
				const isMatch = await bcrypt.compare(password, adminlogin.password)
				if (isMatch == true) {
					console.log("<<<<<<<<<<<<<<<<<<<<<DONE>>>>>>>>>>>>>>>>>>");
					req.session.user = adminlogin
					req.session.profileimage = adminlogin.profileimage
					req.session.loginimage = adminlogin.loginimage
					req.session.faviconimage = adminlogin.faviconimage
					req.flash('msg', 'Logged In Successfully!!!')
					res.redirect('/dashboard')
				} else {
					req.flash('msg', 'Email and password is incorrect')
					res.redirect('/login')
					console.log("<<<<<<<<<<<<<<<<<<<<<<Not done>>>>>>>>>>>>>>>");
				}
			}
		} catch (error) {
			console.log(error);
		}
	},
	adminlogout: async (req, res) => {
		req.session.destroy()
		res.redirect("/login")
	},
	changepassword: async (req, res) => {
		if (!req.session.user) return res.redirect("/login");
		res.render("admin/changepassword", {
			session: req.session,
			msg: req.flash('msg'),
			title: 'change_active'
		})
	},
	passwordchange: async (req, res) => {
		try {
			console.log(">>>>>>>>>>>", req.body);
			const changepass = await db.login.findOne({
				where: {
					id: req.session.user.id
				}
				// limit:1
			})
			const hash = await bcrypt.hash(req.body.newpassword, 10)
			const compare = await bcrypt.compare(req.body.oldpassword, changepass.password)
			if (!compare) {
				req.flash('msg', 'Old password does not match')
				res.redirect('/changepassword')
			} else {
				console.log("success");
				await db.login.update({
					password: hash,
				}, {
					where: {
						id: req.session.user.id
					}
				})
				// 
				//  console.log('------ passeword has been change-------------------');
				req.flash('msg', 'Password changed successfully')
				res.redirect('/login');
			}
		} catch (error) {
			console.log(error);
		}
	},
	profile: async (req, res) => {
		if (!req.session.user) return res.redirect("/login");
		try {
			const data = await db.login.findOne({
				where: {
					id: req.session.user.id
				}
			});
			res.render("admin/profile", {
				data,
				session: req.session,
				msg: req.flash('msg'),
				title: 'profile_active'
			})
		} catch (error) {
			console.log(">>>>notdone>>>>>>>>>>", error);
		}
	},
	postprofile: async (req, res) => {
		try {
			let getLastImage = await db.login.findOne({
				where: {
					id: req.session.user.id
				}
			});
			console.log(getLastImage, "=============================")
			let text1 = "../../public/images/";
			let text2 = getLastImage.profileimage;
			let result = path.join(__dirname + text1.concat(text2));
			let removeImagesss = fs.unlinkSync(result)
			if (req.files && req.files.profileimage) {
				var img = uuid() + req.files.profileimage.name
				uploadDir = path.join(__dirname, '../public/images', img);
				// console.log('uploadDir', uploadDir);
				req.files.profileimage.mv(uploadDir, (err) => {
					if (err)
						return res.status(500).send(err);
				});
			} else {
				var img = img;
			}
			const data = await db.login.update({
				name: req.body.name,
				email: req.body.email,
				profileimage: img,
			}, {
				where: {
					id: req.session.user.id
				}
			})
			var addsession = await db.login.findOne({
				where: {
					email: req.session.user.email
				}
			})
			req.session.user = addsession
			if (data) {
				req.flash('msg', 'Profile updated successfully!!')
				res.redirect('/dashboard')
			} else {
				req.flash('msg', 'Some thing Wrong ')
				res.redirect("/profile")
			}
		} catch (error) {
			console.log(">>>error>>>>", error);
		}
	}
}