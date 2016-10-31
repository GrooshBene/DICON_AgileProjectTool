/**
 * Created by GrooshBene on 2016. 10. 31..
 */

module.exports = init;

function init(app, User, Project, ProjectUser, randomString) {
    app.get('/project/user/list', function (req, res) {
        User.findOne({_id : req.session._id}).exec(function (err, result) {
            if(err){
                console.log('/project/user/list DB Error');
                throw err;
            }
            console.log("User "+ result._id + "'s Projects : "+ result.projects);
            res.send(200, result.projects);
        });
    });

    app.get('/project/add', function (req, res) {
        var project = new Project({
            _id : randomString.generate(13),
            name : req.param('name'),
            invite_link : "http://kafuuchino.one:3000/project/join" + randomString.generate(10)
        });
        if(req.session._id == null){
            res.send(401, "Access Denied");
        }
        else if(req.session._id != null){
            project.save(function (err, silence) {
                if(err){
                    console.log("/project/add DB Error!");
                    throw err;
                }
                console.log("Project Added : "+ project);
                res.send(200, project);
            });
        };
    });

    //function end
}