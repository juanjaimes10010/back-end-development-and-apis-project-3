// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const fs = require("fs");
const url = require('valid-url');

app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))


app.use('/', (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next()
});


// http://expressjs.com/en/starter/basic-routing.html


app.post("/api/shorturl", (req, res) => {

  if (!url.isHttpUri(req.body.url)) return res.json({ error: 'invalid url' });

  fs.readFile("url.json", (err, data) => {

    if (err) return;

    const jsonData = JSON.parse(data);

    jsonData.push({ original_url: req.body.url, short_url: jsonData.length });

    fs.writeFile("url.json", JSON.stringify(jsonData, null, 2), (err) => {
      if (err) return;

      return res.json({ original_url: req.body.url, short_url: jsonData.length - 1 });
    });

  });
});


app.get("/api/shorturl/:shorturl", (req, res) => {

  fs.readFile("url.json", (err, data) => {
    if (err) return;

    const jsonData = JSON.parse(data);

    return res.redirect(jsonData[req.params.shorturl]['original_url']);
  });

})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(3330, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
