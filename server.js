var port = Number(process.env.NODE_PORT || process.env.PORT || 5000);

var express = require('express');
var app = express();

app.use(express.static(__dirname));
var server = app.listen(port, function () {
    console.log('Listening on port %d', server.address().port);
});