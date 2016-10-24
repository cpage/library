let app = require('express');
let mongo = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;

let bookRouter = app.Router();

let router = function (navItems) {
    let url = 'mongodb://localhost:27017/libraryApp';

    bookRouter.route('/')
        .get(function (req, res) {
            mongo.connect(url, function (err, db) {
                let bookCollection = db.collection('books');
                bookCollection.find({}).toArray(function (err, results) {
                    res.render('bookList', {
                        navItems: navItems,
                        books: results
                    });
                    db.close();
                });
            });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var bookId = new ObjectId(req.params.id);
            mongo.connect(url, function (err, db) {
                let bookCollection = db.collection('books');
                bookCollection.find({_id: bookId}).limit(1).next(function (err, results) {
                    res.render('bookDetails', {
                        navItems: navItems,
                        book: results
                    });
                    db.close();
                });
            });
        });

    return bookRouter;
};

module.exports = router;