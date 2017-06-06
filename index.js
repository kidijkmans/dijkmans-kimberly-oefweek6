var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var logger = require("morgan");

var app = express();

app.set('kunstwerkenFile', require('./data/kunstwerken.json'));
app.set('categorieenFile', require('./data/categorieen.json'));
app.set('kunstenaarsFile', require('./data/kunstenaars.json'));


app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'));

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));


app.locals.zoekterm = "";


//home pagina
app.get('/', function(req, res) {
      res.render("index", {
        kunstwerken: req.app.get('kunstwerkenFile').kunstwerken,
        categorieen: req.app.get('categorieenFile').categorieen,
        kunstenaars: req.app.get('kunstenaarsFile').kunstenaars,
        zoekterm: app.locals.zoekterm
      });
});

app.post('/', function(req, res) {
      app.locals.zoekterm = req.body.zoekterm;
      res.redirect("/zoeken");
});

//kunstwerk
app.get('/items/:id', function(req, res) {
  var kunstwerkenFile = req.app.get('kunstwerkenFile');
  var id = req.params.id;
  var teller = 0;
  var item = "";
  while (teller < kunstwerkenFile.kunstwerken.length ) {
    if (kunstwerkenFile.kunstwerken[teller].id == id) {
      item = kunstwerkenFile.kunstwerken[teller];
    }
    teller++;
  }
  if (item !== "") {
    res.render("kunstwerk", {
      item: item,
      categorieen: req.app.get('categorieenFile').categorieen,
      kunstenaars: req.app.get('kunstenaarsFile').kunstenaars,
      zoekterm: app.locals.zoekterm
    });
  } else {
    res.render("404", {
      categorieen: req.app.get('categorieenFile').categorieen,
      kunstenaars: req.app.get('kunstenaarsFile').kunstenaars,
      zoekterm: app.locals.zoekterm
    });
  }
});

app.post('/items/:id', function(req, res) {
      app.locals.zoekterm = req.body.zoekterm;
      res.redirect("/zoeken");
});

//categorie
app.get('/categorieen/:id', function(req, res) {
  res.render("categorie", {
      id: req.params.id,
      items: req.app.get('kunstwerkenFile').kunstwerken,
      categorieen: req.app.get('categorieenFile').categorieen,
      kunstenaars: req.app.get('kunstenaarsFile').kunstenaars,
      zoekterm: app.locals.zoekterm
  });
});

app.post('/categorieen/:id', function(req, res) {
      app.locals.zoekterm = req.body.zoekterm;
      res.redirect("/zoeken");
});

//kunstenaar
app.get('/kunstenaars/:id', function(req, res) {
  res.render("kunstenaar", {
      id: req.params.id,
      items: req.app.get('kunstwerkenFile').kunstwerken,
      categorieen: req.app.get('categorieenFile').categorieen,
      kunstenaars: req.app.get('kunstenaarsFile').kunstenaars,
      zoekterm: app.locals.zoekterm
  });
});

app.post('/kunstenaars/:id', function(req, res) {
      app.locals.zoekterm = req.body.zoekterm;
      res.redirect("/zoeken");
});

// zoeken
app.get('/zoeken', function(req, res) {
      res.render("zoeken", {
        id: req.params.id,
        items: req.app.get('kunstwerkenFile').kunstwerken,
        categorieen: req.app.get('categorieenFile').categorieen,
        kunstenaars: req.app.get('kunstenaarsFile').kunstenaars,
        zoekterm: app.locals.zoekterm
      });
});

app.post('/zoeken', function(req, res) {
      app.locals.zoekterm = req.body.zoekterm;
      res.redirect("/zoeken");
});




app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
