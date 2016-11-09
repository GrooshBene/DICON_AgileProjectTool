app.get('/chat/user', function (req, res) {
        //프로젝트 내 유저와 1대1 채팅
        if(req.user != undefined){
            var path = require("path");
            res.sendFile(path.resolve('views/chat.html'));
        }
        else if(req.user == undefined){
            res.send(401, "Access Denied")
        }

    });