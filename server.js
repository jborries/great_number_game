//Require the Express Module
const express = require('express');
const path = require('path');
//Create an express app
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
//Allows us to parse data entered into the form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.use(session({secret: 'secretpassword'}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
//set port to listen to for heroku deployment
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// Routes
//Test
// Root Request
app.get('/', function(req, res) {
  if (req.session.number_answer === undefined){
    req.session.number_answer = Math.floor(Math.random() * 101);
    console.log(req.session.number_answer);
  }
  res.render('index', {result: req.session.result,
    number_answer: req.session.number_answer});
})

// Add User guess
app.post('/guess', function(req, res) {
    console.log('POST DATA', req.body);
    req.session.thing = req.body.thing;
  let guess = req.body.guess;
  console.log(guess);
  if (guess == req.session.number_answer){
    console.log('correct');
    req.session.result = 'correct';
  }else if (guess > req.session.number_answer){
    console.log('high');
    req.session.result = 'high';
  }else if (guess < req.session.number_answer){
    console.log('low');
    req.session.result = 'low';
  }
  res.redirect('/');
})

//Resets game
app.get('/reset', function(req, res) {
  req.session.destroy();
  res.redirect('/');
})

// Setting our Server to Listen on Port: 8000
//app.listen(8000, function() {
  //  console.log("listening on port 8000");
//})
