/**
 * Created by GrooshBene on 2016. 10. 31..
 */

module.exports = init;

function init(app, User, Project, ProjectUser, randomString) {
    app.post('/project/user/list', function (req, res) {
        User.findOne({_id: req.user}).exec(function (err, result) {
            if (err) {
                console.log('/project/user/list DB Error');
                throw err;
            }
            console.log("User " + result._id + "'s Projects : " + result.projects);
            res.send(200, result.projects);
        });
    });

    app.get('/project/user/list', function (req, res) {
        console.log("CallBack Success Session : " + req.user);
        if (req.user != undefined) {
            var path = require("path");
            res.sendFile(path.resolve('views/main.html'));
        }
        else if (req.user == undefined) {
            res.send(401, "Access Denied");
        }
    })

    app.post('/projectuser/get/list', function (req, res) {
        ProjectUser.find({_projectId: req.param('project_name')}, function (err, result) {
            if (err) {
                console.log("/project/user/getlist DB Error");
                throw err;
            }
            res.send(200, result);
        });
    });

    app.get('/project/add', function (req, res) {
        if (req.user == null) {
            res.send(401, "Access Denied");
        }
        else if (req.user != null) {
            var projectId = randomString.generate(13);
            var project = new Project({
                _id: projectId,
                name: req.param('name'),
                invite_link: "http://kafuuchino.one:3000/project/join/" + req.param('name')
            });
            var projectUser = new ProjectUser({
                _id: req.user,
                project_id: projectId,
                name: req.param('name')
            });
            User.findOneAndUpdate({_id: req.user}, {$push: {projects: projectId}}).exec(function (err, result) {
                if (err) {
                    console.log('/project/add User Profile Updating DB Error');
                    throw err;
                }
                console.log("User " + req.user + "'s Project Array Has Updated");
            })
            projectUser.save(function (err, silence) {
                if (err) {
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
    });

    //req.user -> req.user


    app.get('/project/profile/edit', function (req, res) {
        Project.findOneAndUpdate({_id: req.user}, {name: req.param('name')}).exec(function (err, result) {
            if (err) {
                console.log("/project/profile/edit DB Error");
                throw err;
            }
            if (req.user == null) {
                console.log('Access Denied At /project/profile/edit');
                res.send(401, "Access Denied");
            }
            else if (req.user == null) {
                console.log("ProjectUser Info Updated Successfully");
                res.send(200, "Updated Successfully");
            }
        })
    })
    //no

    app.get('/project/join/:project_name', function (req, res) {
        var projectUser = new ProjectUser({
            _id: req.user,
            _projectId: req.param('project_name'),
            name: req.param('name')
        });
        Project.find({name: req.param('project_name')}).exec(function (err, result) {
            if (err) {
                console.log("/project/join/:project_name DB Error");
                throw err;
            }
            if (result.length == 0) {
                console.log("Non-Effective URL");
                res.send(400, "Non-Effective URL");
            }
            else if (result.length != 0) {
                if (req.user == null) {
                    console.log("Access Denied On /project/join/:project_id");
                    res.send(401, "Access Denied");
                }
                else if (req.user != null) {
                    projectUser.save(function (err, silence) {
                        if (err) {
                            console.log('/project/join/:project_name Saving DB Error');
                            throw err;
                        }
                        console.log("Project User " + projectUser._id + "Created");
                        res.send(200, projectUser);
                    });
                }
            }
        });
    });

    //req.user -> req.user

    app.post('/project/invite', function (req, res) {
        Project.findOne({_id: req.param('project_id')}, function (err, result) {
            if (err) {
                console.log('/project/invite DB Error');
                throw err;
            }
            if (req.user == null) {
                console.log("Access Denied at /project/invite");
                res.send(401, "Access Denied");
            }
            else if (req.user != null) {
                res.send(200, result.invite_link);
            }
        })
    })

    app.get('/project/:project_id', function (req, res) {
        Project.findOne({_id: req.param('project_id')}, function (err, result) {
            if (err) {
                console.log('/project/:project_id DB Error');
                throw err;
            }
            if (req.user == null) {
                res.send(401, "Access Denied");
            }
            else if (req.user != null) {
                // ProjectUser.find({_id : req.user}, function (err, result) {
                //     if(err){
                //         console.log('/project/:project_id DB User Finding Error');
                //         throw err;
                //     }
                //     if(!result){
                //         res.send(401, "Access Denied");
                //     }
                //     else if(result){
                //         var path = require("path");
                //         res.sendFile(path.resolve('views/main.html'));
                //     }
                // })
                var path = require("path");
                res.sendFile(path.resolve('views/team.html'));
            }
        })
    })

    //function end
}