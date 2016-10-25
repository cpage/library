let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let mongo = require('mongodb').MongoClient;

module.exports = function () {
    let mongoUrl = 'mongodb://localhost:27017/libraryApp';

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function (username, password, done) {

        mongo.connect(mongoUrl, function (err, db) {
            let userColl = db.collection('users');
            userColl.findOne({
                username: username
            }, function (err, results) {
                if (results.password === password) {
                    done(null, results);
                } else {
                    done(null, false);
                }
            });
        });
    }));
};