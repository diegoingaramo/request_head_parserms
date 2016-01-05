var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get("/api/whoami", function(req, res) {

    console.log('User-Agent: ' + req.headers);

    for(var propertyName in req.headers) {
        console.log(propertyName + ": " + req.headers[propertyName]);
    }

    console.log("USER AGENT");
    for(var propertyName in req.headers["User-Agent"]) {
        console.log(propertyName + ": " + req.headers["User-Agent"][propertyName]);
    }    

    /* ip */
    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

     /*language*/
     var UALanguage = req.headers["accept-language"].substr(0,req.headers["accept-language"].indexOf(","));

     var os = req.headers["user-agent"].slice(req.headers["user-agent"].indexOf("(")+1,req.headers["user-agent"].indexOf(")"));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ipaddress:ip,language:UALanguage,software:os}));
});

app.get(/.*/, function(req, res) {
  res.redirect(301,'/api/whoami');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
