const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const healthCheck = require("aws-elb-healthcheck");
const cookie = require('cookie');
const renderhare = require('renderhare');

const jsonParser = bodyParser.json();
const app = express();

const public = 'build';
const port = process.env.PORT || 8044;

function generateNewDatabase() {
  return [
    {id: 1, value: 'Pepperoni pizza'},
    {id: 2, value: 'The works calzone'}
  ]
}

let database = generateNewDatabase();

app.get('/api/orders', function(req, res){
  res.writeHead(200, {
    'content-type': 'application/json',
    'access-control-allow-origin': 'http://localhost:3000'
  });
  res.end(JSON.stringify(database));
});

app.post('/api/orders', jsonParser, function(req, res){
  let last = database[database.length - 1];
  let newId = last.id + 1;
  let item = { id: newId, value: req.body.value };

  // Prevent consuming too much memory!
  if(database.length >= 25) {
    database = generateNewDatabase();
  }

  database.push(item);
  res.writeHead(200, {
    'content-type': 'application/json',
    'access-control-allow-origin': 'http://localhost:3000'
  });
  res.end(JSON.stringify(item));
});

app.get('/api/session', function(req, res){
  let cookies = cookie.parse(req.headers.cookie || '');
  let loggedIn = cookies.loggedIn === 'true';

  res.writeHead(200, {
    'content-type': 'application/json',
    'access-control-allow-origin': 'http://localhost:3000'
  });
  res.end(JSON.stringify({ loggedIn }));
});

app.post('/api/session', function(req, res){
  let setCookie = cookie.serialize('loggedIn', true, {
    path: '/'
  });

  res.writeHead(200, {
    'content-type': 'application/json',
    'access-control-allow-origin': 'http://localhost:3000',
    'Set-Cookie': setCookie
  });
  res.end(JSON.stringify({loggedIn: true}));
});

app.delete('/api/session', function(req, res){
  let setCookie = cookie.serialize('loggedIn', false, {
    path: '/'
  });

  res.writeHead(200, {
    'content-type': 'application/json',
    'access-control-allow-origin': 'http://localhost:3000',
    'Set-Cookie': setCookie
  });
  res.end(JSON.stringify({loggedIn: false}));
});

// Let AWS ELB know the app is up, without rendering a page.
app.use(healthCheck);

const renderharemw = renderhare({
  bypass: !process.env.RENDERHARE_API_TOKEN,
  token: process.env.RENDERHARE_API_TOKEN || 'NO_TOKEN'
});

app.use('/', renderharemw);
app.use('/login', renderharemw);

app.use(express.static(__dirname + `/../${public}`));
app.use(cors());

http.createServer(app).listen(port);

console.error(`Listening at http://localhost:${port}`);
