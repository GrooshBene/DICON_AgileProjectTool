/**
 * Created by GrooshBene on 2016. 10. 31..
 */

module.exports = init;

function init(app, User, Project, ProjectUser, randomString) {
    app.get('/project/user/list', function (req, res) {
        User.findOne({_id: req.session._id}).exec(function (err, result) {
            if (err) {
                console.log('/project/user/list DB Error');
                throw err;
            }
            console.log("User " + result._id + "'s Projects : " + result.projects);
            res.send(200, result.projects);
        });
    });

    app.get('/project/add', function (req, res) {
        var project = new Project({
            _id: randomString.generate(13),
            name: req.param('name'),
            invite_link: "http://kafuuchino.one:3000/project/join" + this._id
        });
        if (req.session._id == null) {
            res.send(401, "Access Denied");
        }
        else if (req.session._id != null) {
            var projectUser = new ProjectUser({
                _id: req.session._id,
                project_id: project._id,
                name: req.param('name')
            });
            User.findOneAndUpdate({_id : req.session._id}, {$push : {projects : project._id}}).exec(function (err, result) {
                if(err){
                    console.log('/project/add User Profile Updating DB Error');
                    throw err;
                }
                console.log("User "+ req.session._id + "'s Project Array Has Updated");
            })
            projectUser.save(function (err, silence) {
                if(err){
                    console.log('project User Saving Error');
                    throw err;
                }
                console.log("Project User Has Created");
            });
            project.save(function (err, silence) {
                if (err) {
                    console.log("/project/add DB Error!");
                    throw err;
                }
                console.log("Project Added : " + project);
                res.send(200, project);
            });
        }
        ;
    });


    app.get('/project/profile/edit', function (req, res) {
        Project.findOneAndUpdate({_id: req.session._id}, {name: req.param('name')}).exec(function (err, result) {
            if (err) {
                console.log("/project/profile/edit DB Error");
                throw err;
            }
            if (req.session._id == null) {
                console.log('Access Denied At /project/profile/edit');
                res.send(401, "Access Denied");
            }
            else if (req.session._id == null) {
                console.log("ProjectUser Info Updated Successfully");
                res.send(200, "Updated Successfully");
            }
        })
    })

    app.get('/project/join/:project_id', function (req, res) {
        var projectUser = new ProjectUser({
            _id: req.session._id,
            project_id: req.param('project_id'),
            name: req.param('name')
        });
        Project.find({_id: req.param('project_id')}).exec(function (err, result) {
            if (err) {
                console.log("/project/join/:project_id DB Error");
                throw err;
            }
            if (result.length == 0) {
                console.log("Non-Effective URL");
                res.send(400, "Non-Effective URL");
            }
            else if (result.length != 0) {
                if (req.session._id == null) {
                    console.log("Access Denied On /project/join/:project_id");
                    res.send(401, "Access Denied");
                }
                else if (req.session._id != null) {
                    projectUser.save(function (err, silence) {
                        if (err) {
                            console.log('/project/join/:project_id Saving DB Error');
                            throw err;
                        }
                        console.log("Project User " + projectUser._id + "Created");
                        res.send(200, "Project User " + projectUser.name + "Created");
                    });
                }
            }
        });
    });

    app.post('/project/invite', function (req, res) {
        Project.findOne({_id : req.param('project_id')}, function (err, result) {
            if(err){
                console.log('/project/invite DB Error');
                throw err;
            }
            if(req.session._id == null){
                console.log("Access Denied at /project/invite");
                res.send(401, "Access Denied");
            }
            else if(req.session._id != null){
                res.send(200, result.invite_link);
            }
        })
    })


    //function end
}