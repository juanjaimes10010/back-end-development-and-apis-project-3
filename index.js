// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { type } = require('express/lib/response');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use('/', (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next()
});


// http://expressjs.com/en/starter/basic-routing.html

app.get("/api/", function (req, res) {
  res.json({ "unix": new Date().getTime(), "utc": new Date().toUTCString() });
});


// app.get("/api/:date?", (req, res) => {

//   const data = /^\d+$/.test(req.params.date) ? parseInt(req.params.date) : req.params.date ?? Date.now();

//   const date = new Date(data);

//   if (date == "Invalid Date") res.json({ error: "Invalid Date" });

//   res.json({ unix: parseInt(date.getTime()), utc: date.toUTCString() });


// })


app.get("/api/whoami", (req, res) => {

  res.json({
    ipaddress: req.ip,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  })
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(3330, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
