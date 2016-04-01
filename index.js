var port = Number(process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000);
var ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var express = require('express');
var app = express();

app.use(express.static(__dirname));
var server = app.listen(port, ip, function () {
    console.log('Listening on port %d', server.address().port);
});