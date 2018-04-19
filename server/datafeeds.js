/* eslint-disable */
var express = require('express')
var url = require('url');
var fs = require("fs");
var app = express()
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('content-type', "text/plain");
    // res.header('content-encoding', "gzip");
    // res.header('Transfer-Encoding: chunked');
    next();
});

function query(req) {
    var parts = url.parse(req.url, true) || {}
    var query = parts.query;
    return query || {};
}

function serveFile(fileName, cb) {
    fs.readFile(`public/data/${fileName}`, function (err, data) {
        console.log('read file', fileName)
        if (err) {
            cb(err)
            return console.error(err);
        }
        cb(data.toString());
    });
}

app.get('/', function (req, res) {
    let qry = query(req)
    let parse = url.parse(req.url, true)
    console.log(parse)
    res.send(qry)
    console.log("query => ", qry)
});

/**
 * general file serve
 */
['symbol_info', 'search', 'config', 'time', 'timescale_marks', 'marks']
    .forEach(function (method) {
        app.get('/' + method, function (req, res) {
            serveFile(method, function (data) {
                res.send(data)
            });
        })
    });

['symbols', 'history']
.forEach(function (method) {
    app.get('/' + method, function (req, res) {
        let qry = query(req)
        var symbol = '';
        if (qry.symbol == 'JRNT') {
            symbol = '_' + qry.symbol;
        }
        serveFile(method + symbol, function (data) {
            res.send(data)
        });

    })
});

//set listening port
app.listen(3000);
console.log("listening http://localhost:3000")