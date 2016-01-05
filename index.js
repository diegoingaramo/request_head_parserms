var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get("/api/whoami", function(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({result:'/api/whoami'}));
});

app.get(/.*/, function(req, res) {
  res.redirect(301,'/api/whoami');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
