let app = require('express');

let bookRouter = app.Router();

let router = function (navItems) {
    let bookSvc = require('../services/goodreadService')();
    let controller = require('../controllers/bookController')(bookSvc, navItems);

    bookRouter.use(controller.handleAuth);
    bookRouter.route('/').get(controller.getIndex);
    bookRouter.route('/:id').get(controller.getById);

    return bookRouter;
};

module.exports = router;