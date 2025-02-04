const db = require('./models');
// const helper = require('./helpers/helper');
const sequelize = require('sequelize');
const Op = sequelize.Op;
var users = db.users;
var messages = db.messages;        // var chat = db.chat;
var chatConstant = db.chatConstant; //var constant = db.constant;
var blockedUser = db.blocked_users
var socketuser = db.socketuser;   // var onlineUser = db.online_user;

// const fun = require('./function/socketFunction');
module.exports = function (io) {

  io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('connect_user', async function (connect_listener) {
      try {
        var socketId = socket.id
        let check_user = await socketuser.findOne({

          where: {
            userid: connect_listener.userid
          }
        });
        // console.log(socket_id)

        if (check_user) {

          create_socket_user = await socketuser.update({
            status: 1,
            socket_id: socketId,
          },
            {
              where: {
                userid: connect_listener.userid
              }
            }
          );


        } else {
          create_socket_user = await socketuser.create({
            userid: connect_listener.userid,
            socket_id: socketId,
            status: 1,
            // createdAt: await fun.create_time_stamp(),
          })
        }
        success_message = [];
        success_message = {
          'success_message': 'connected successfully'
        }
        socket.emit('connect_listener', success_message);
      } catch (error) {
        throw error
      }
    });
   
   

  
  });

}