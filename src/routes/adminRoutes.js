let app = require('express');
let adminRouter = app.Router();
let mongo = require('mongodb').MongoClient;
let books = [
        {
            title: 'Ender\'s Game',
            author: 'Orson Scott Card'
        },
        {
            title: 'The Martian',
            author: 'Andy Weird'
        },
        {
            title: 'Harry Potter',
            author: 'J.K. Rowling'
        },
        {
            title: 'Inferno',
            author: 'Dan Brown'
        }
    ];

let router = function (nav) {

    adminRouter.route('/addbooks')
        .get(function (req, res) {
            let url = 'mongodb://localhost:27017/libraryApp';
            mongo.connect(url, function (err, db) {
                let bookCollection = db.collection('books');
                bookCollection.insertMany(books, function (err, results) {
                    res.send(results);
                    db.close();
                });
            });
        });
    return adminRouter;
};

module.exports = router;