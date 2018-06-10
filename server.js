const path = require('path')
const express = require('express')
const layout = require('express-layout')
var bodyParser = require('body-parser');
var login = require('./routes/loginroutes');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'))
app.set('view engine',  'pug')
app.use(express.static(__dirname + '/public'));

const middlewares = [
  layout(),
  express.static(path.join(__dirname, 'public'))
]
app.use(middlewares)

//index page 
app.get('/', function(req, res) {
    res.render('index');
});

app.post('/aa', function(req, res) {
    res.json({ message: 'welcome to aa api ' });
});

app.post('/api/login',function(req, res) {
    res.status(200).send("success")
});

app.all('/api/login/*',login.login);
app.post('/api/register',login.register);


app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(5000);