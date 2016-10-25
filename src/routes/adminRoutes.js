let app = require('express');
let adminRouter = app.Router();
let mongo = require('mongodb').MongoClient;
let books = [
        {
            title: 'Ender\'s Game',
            author: 'Orson Scott Card',
            bookId: 375802
        },
        {
            title: 'The Martian',
            author: 'Andy Weir',
            bookId: 18007564
        },
        {
            title: 'Harry Potter',
            author: 'J.K. Rowling',
            bookId: 3
        },
        {
            title: 'Inferno',
            author: 'Dan Brown',
            bookId: 17212231
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