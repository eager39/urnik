const express = require('express')
var bodyParser = require("body-parser")
var cors = require('cors')

var mysql = require('mysql')
const app = express()
var conf = require('./config')
conf=new conf();



var connection = mysql.createConnection({
  host: 'localhost',
  user: conf.DBuser, 
  password: conf.DBpass, 
  database: 'urnik',
  multipleStatements: true
})



connection.connect(function(err) {
  if(err){
    console.log("Napaka v povezavi do baze");
  }else{
     console.log('You are now connected...')
  }
 
})
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


app.get('/data', function(req, res) {
  var sql="SELECT * FROM prostori;SELECT prostori_id,predmet_id,days_week,prostori.velikost,prostori.ime as prostor,predmet.ime as predmet FROM urnik.prostor_predmet  INNER JOIN prostori on prostori.id=prostor_predmet.prostori_id INNER JOIN predmet on predmet.id=prostor_predmet.predmet_id"
  //var sql='SELECT prostori_id,predmet_id,days_week,prostori.velikost,prostori.ime as prostor,predmet.ime as predmet FROM urnik.prostor_predmet  INNER JOIN prostori on prostori.id=prostor_predmet.prostori_id INNER JOIN predmet on predmet.id=prostor_predmet.predmet_id;';
  connection.query(sql, function(err, results) {
    if (err) throw err
 
 
   
    res.send(results);
  });
}, err => {
  console.log("Error " + err);
});




app.listen(3000, () => console.log('Example app listening on port 3000!'))