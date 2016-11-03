/**
 * Created by GrooshBene on 2016. 11. 4..
 */

module.exports = init;

function init(app, User, Project, ProjectUser, Scrum, randomString) {

    app.post('/scrum/project/:project_id', function (req, res) {
        Scrum.find({project : req.param('project_id')}, function (err, result) {
            if(err){
                console.log('/scrum/project/:project_id DB Error');
                throw err;
            }
            if(req.user != undefined){
                res.send(200, result);
            }
            else if(req.user == undefined){
                res.send(401, "Access Denied");
            }
        });
    });

    app.post('/scrum/add', function (req, res) {
        var scrum = new Scrum({
            _id : randomString.generate(11),
            maker : req.param('maker'),
            title : req.param('title'),
            date : new Date(),
            due : req.param('due'),
            important : req.param('important'),
            comment : req.param('comment'),
            project : req.param('project'),
            memo : [],
            status : 0
        })
        if(req.user != undefined){
            scrum.save(function (err, silence) {
                if(err){
                    console.log("/scrum/add DB Error");
                    throw err;
                }
                res.send(200, scrum);
            });
        }
        else if(req.user == undefined){
            res.send(401, "Access Denied");
        }
    })

    //function end
}
