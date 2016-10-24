let app = require('express');
let mongo = require('mongodb').MongoClient;

let authRouter = app.Router();

let router = function () {
    let mongoUrl = 'mongodb://localhost:27017/libraryApp';
    authRouter.route('/signUp')
        .post(function (req, res) {
            mongo.connect(mongoUrl, function (err, db) {
                var userColl = db.collection('users');
                let user = {
                    username: req.body.username,
                    passowrd: req.body.password
                };

                userColl.insert(user, function (err, results) {
                    req.login(results.ops[0], function () {
                        res.redirect('/auth/profile');
                    });

                });
            });
        });
    authRouter.route('/profile')
        .get(function (req, res) {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;