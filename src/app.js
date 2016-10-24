let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let passport = require('passport');

let app = express();

let port = process.env.PORT || 5000;

let navItems = [
    {
        link: '/books',
        text: 'Books'
    },
    {
        link: '/authors',
        text: 'Authors'
    }
];

let bookRouter = require('./routes/bookRoutes')(navItems);
let adminRouter = require('./routes/adminRoutes')(navItems);
let authRouter = require('./routes/authRoutes')();

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: 'library'
}));
require('./config/passportConfig')(app);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function(req, res) {
    res.render('index', {
        navItems: navItems
    });
});

app.listen(port, function () {
    console.log('server listening on port ' + port);
});