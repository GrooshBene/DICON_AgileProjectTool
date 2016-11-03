/**
 * Created by GrooshBene on 2016. 11. 1..
 */

var io = require('../sio').io;

module.exports = init;
function init(app, User, Project, ProjectUser, randomString, socket) {

    app.get('/chat/find', function (req, res) {
        //채팅 내용 내 검색
        //검색 키워드 받는 파라미터 : req.param('keyword')

    });

    app.get('/chat/user', function (req, res) {
        //프로젝트 내 유저와 1대1 채팅

    });


    app.get('/chat/:chatroom_id', function (req, res) {
        //프로젝트 내 채팅방 방 id로 참가
        //방 id접근 : req.param('chatroom_id')

    });
    //function end
}