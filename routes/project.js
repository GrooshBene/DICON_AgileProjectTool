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

    app.get('')
    //function end
}