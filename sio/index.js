/**
 * Created by GrooshBene on 2016. 11. 4..
 */

var socketio = require('socket.io')

exports.init = function(server){
    var io = socketio(server);
    exports.io = io;

    io.on('connection', function(socket){

    });
}