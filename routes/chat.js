/**
 * Created by GrooshBene on 2016. 11. 1..
 */
module.exports = init;
function init(app, User, Project, ProjectUser, randomString, sio) {
    app.get('/chat/find', function (req, res) {
        //채팅 내용 내 검색
        //검색 키워드 받는 파라미터 : req.param('keyword')
        var path = require("path");
        res.sendFile(path.resolve('views/chat.html'));
    });

    sio.on('connection', function(socket){
        console.log('asdf');
        socket.on('disconnect', function () {
            console.log('asdfadsf');
        })
    })

    app.get('/chat/user', function (req, res) {
        //프로젝트 내 유저와 1대1 채팅

    });


    app.get('/chat/:chatroom_id', function (req, res) {
        //프로젝트 내 채팅방 방 id로 참가
        //방 id접근 : req.param('chatroom_id')

    });
    //function end
}