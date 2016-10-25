let http = require('http');
let xml2js = require('xml2js');
let parser = xml2js.Parser({
    explicitArray: false
});

let goodreadsService = function () {
    let getBookById = function (id, callback) {
        let options = {
            host: 'www.goodreads.com',
            path: '/book/show/' + id + '?format=xml&key=mN1DyVoFS4cfbCMh5HmnpA'
        };

        let reqCallback = function (res) {
            let resStr = '';
            res.on('data', function (chunk) {
                resStr += chunk;
            });

            res.on('end', function () {
                parser.parseString(resStr, function (err, result) {
                    callback(null, result.GoodreadsResponse.book);

                });
            });
        };

        http.request(options, reqCallback).end();

    };

    return {
        getBookById: getBookById
    };
};

module.exports = goodreadsService;