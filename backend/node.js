const express = require('express')
var bodyParser = require("body-parser")
var cors = require('cors')
var fs = require('fs');
var mysql = require('mysql')
const app = express()
var conf = require('./config')
conf=new conf();
var ical = require('node-ical');



var connection = mysql.createConnection({
  host: 'localhost',
  user: conf.DBuser, 
  password: conf.DBpass, 
  database: 'urnik',
  multipleStatements: true
})
/*
var polje=[];
var location=[];
var subject=[];
var event=[];
var array = fs.readFileSync('basic.ics').toString().split("\n");
for(i in array) {
  
   polje[i]=array[i];
  
}
for(i in polje) {
  
  if(polje[i].includes("LOCATION")){
    
 location[i]=polje[i].split("LOCATION:")[1]
 location = location.filter(function(e){ return e.replace(/(\r\n|\n|\r)/gm,"")}); //remove empty ,and breaks
 location = Array.from(new Set(location)) //only unique
    
  }
  if(polje[i].includes("SUMMARY")){
    
    subject[i]=polje[i].split("SUMMARY: | LOCATION: |DTSTART ")[1]
   // subject = subject.filter(function(e){ return e.replace(/(\r\n|\n|\r)/gm,"")}); //remove empty ,and breaks
    subject = Array.from(new Set(subject)) //only unique
       
     }
 
}
for (i in location){
  //console.log(location[i]);
}
for (i in subject){
//  console.log(subject[i]);
}
for(i in polje){
 event.push(polje[i].split("LOCATION:")[1]),polje[i].split("SUMMARY:")[1];
 
}
for(i in event) {
 // console.log(event[i]);
}

 event =event. filter(Boolean);
 console.log(event);*/
var polje=[];
 var data = ical.parseFile("basic.ics", function(err, data) {
  if (err) console.log(err);
 // console.log(data);
  for (var k in data){
    if (data.hasOwnProperty(k)) {
   
      var ev = data[k];
      console.log(new Date(ev.start));
   polje.push({"predmet":ev.summary,"lokacija":ev.location,"kdaj":JSON.stringify(ev.start),"konec":JSON.stringify(ev.end),"opis":ev.description})
    }
  }
  console.log(polje[6]);
});


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
  var sql="SELECT * FROM prostori;SELECT prostori_id,predmet_id,days_week,prostori.velikost,prostori.ime as prostor,predmet.ime as predmet,DATE_FORMAT(start_time, '%H:%i') as start_time, DATE_FORMAT(end_time, '%H:%i') as end_time,UNIX_TIMESTAMP(end_date)*1000 as end_date FROM urnik.prostor_predmet INNER JOIN prostori on prostori.id=prostor_predmet.prostori_id INNER JOIN predmet on predmet.id=prostor_predmet.predmet_id order by start_time asc"
  //var sql='SELECT prostori_id,predmet_id,days_week,prostori.velikost,prostori.ime as prostor,predmet.ime as predmet FROM urnik.prostor_predmet  INNER JOIN prostori on prostori.id=prostor_predmet.prostori_id INNER JOIN predmet on predmet.id=prostor_predmet.predmet_id;';
  connection.query(sql, function(err, results) {
    if (err) throw err
 
 
   console.log(results)
    res.send(results);
  });
}, err => {
  console.log("Error " + err);
});




app.listen(3000, () => console.log('Example app listening on port 3000!'))