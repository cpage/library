let mongo = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;

let bookController = function (bookService, navItems) {
    let mongoUrl = 'mongodb://localhost:27017/libraryApp';
    let getIndex = function (req, res) {
        mongo.connect(mongoUrl, function (err, db) {
            let bookCollection = db.collection('books');
            bookCollection.find({}).toArray(function (err, results) {
                res.render('bookList', {
                    navItems: navItems,
                    books: results
                });
                db.close();
            });
        });
    };

    let getById = function (req, res) {
        var bookId = new ObjectId(req.params.id);
        mongo.connect(mongoUrl, function (err, db) {
            let bookCollection = db.collection('books');
            bookCollection.find({
                _id: bookId
            }).limit(1).next(function (err, results) {
                bookService.getBookById(results.bookId, function (err, book) {
                    results.data = book;
                    res.render('bookDetails', {
                        navItems: navItems,
                        book: results
                    });
                });

                db.close();
            });
        });
    };

    let handleAuth = function (req, res, next) {
        if (!req.user) {
            //res.redirect('/');
        }
        next();
    };

    return {
        getIndex: getIndex,
        getById: getById,
        handleAuth: handleAuth
    };
};

module.exports = bookController;