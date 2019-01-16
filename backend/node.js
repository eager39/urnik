const express = require('express')
var bodyParser = require("body-parser")
var cors = require('cors')
var fs = require('fs')
var schedule = require('node-schedule')
var mysql = require('mysql')
const app = express()
var conf = require('./config')
conf=new conf();
var util = require('util')
var ical = require('node-ical')

var now = new Date();


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
 //var j = schedule.scheduleJob('0 0 0 * * *', function(){
 var events=[];
var polje1=[],polje2=[],polje3=[],polje4=[],polje5=[];
var prostori=[];
var promise1 = new Promise(function(resolve, reject) {
  var data = ical.fromURL("http://www.google.com/calendar/ical/academia.si_k49so77cbr6dsalbjeovcv3poo%40group.calendar.google.com/public/basic.ics",{}, function(err, data) {
  if (err) reject(err);
  values=data
  for (var k in values){
    if (values.hasOwnProperty(k)) {
   
      var ev = values[k];
    
      if((Date.parse(ev.start))/1000>(Math.floor(new Date().getTime()/1000))){
      
       // prostori.push(ev.location)
      // prostori= Array.from(new Set(prostori));
      polje1.push([ev.summary,ev.location,(Date.parse(ev.start)/1000),(Date.parse(ev.end)/1000)])     }
      
  
    }
  }
 
 resolve(polje1);
});
});
var promise2 = new Promise(function(resolve, reject) {
  var data = ical.fromURL("http://www.google.com/calendar/ical/academia.si_psb3atemfrjhvmqb5bkafjpmk4%40group.calendar.google.com/public/basic.ics",{}, function(err, data) {
  if (err) reject(err);
  values=data
  for (var k in values){
    if (values.hasOwnProperty(k)) {
   
      var ev = values[k];
      
    
      if((Date.parse(ev.start))/1000>(Math.floor(new Date().getTime()/1000))){
      
        // prostori.push(ev.location)
      // prostori= Array.from(new Set(prostori));
      polje2.push([ev.summary,ev.location,(Date.parse(ev.start)/1000),(Date.parse(ev.end)/1000)])      }
      
  
    }
  }
  resolve(polje2);
});
});
var promise3 = new Promise(function(resolve, reject) {
  var data = ical.fromURL("http://www.google.com/calendar/ical/academia.si_i0t07ofv6vpvclbgp82iugvpgo%40group.calendar.google.com/public/basic.ics",{}, function(err, data) {
  if (err) reject(err);
  values=data
  for (var k in values){
    if (values.hasOwnProperty(k)) {
   
      var ev = values[k];
      
     
      if((Date.parse(ev.start))/1000>(Math.floor(new Date().getTime()/1000))){
      
     // prostori.push(ev.location)
      // prostori= Array.from(new Set(prostori));
      polje3.push([ev.summary,ev.location,(Date.parse(ev.start)/1000),(Date.parse(ev.end)/1000)])      }
      
  
    }
  }
  resolve(polje3);
});
});
var promise4 = new Promise(function(resolve, reject) {
  var data = ical.fromURL("http://www.google.com/calendar/ical/academia.si_uql954u28t4n27tfactj7j5i04%40group.calendar.google.com/public/basic.ics",{}, function(err, data) {
  if (err) reject(err);
  values=data
  for (var k in values){
    if (values.hasOwnProperty(k)) {
   
      var ev = values[k];
      
      
      if((Date.parse(ev.start))/1000>(Math.floor(new Date().getTime()/1000))){
      
        // prostori.push(ev.location)
      // prostori= Array.from(new Set(prostori));
      polje4.push([ev.summary,ev.location,(Date.parse(ev.start)/1000),(Date.parse(ev.end)/1000)])      }
      
  
    }
  }
  resolve(polje4);
});
});
var promise5 = new Promise(function(resolve, reject) {
  var data = ical.fromURL("http://www.google.com/calendar/ical/academia.si_0i01hedl2iac2klrbvlhuj61q8%40group.calendar.google.com/public/basic.ics",{}, function(err, data) {
  if (err) reject(err);
  
  values=data
  for (var k in values){
    if (values.hasOwnProperty(k)) {
   
      var ev = values[k];
      
      if((Date.parse(ev.start))/1000>(Math.floor(new Date().getTime()/1000))){
      
       // prostori.push(ev.location)
      // prostori= Array.from(new Set(prostori));
     polje5.push([ev.summary,ev.location,(Date.parse(ev.start)/1000),(Date.parse(ev.end)/1000)])
     }
      
  
    }
  }
  console.log(polje5.length)
  resolve(polje5);
});
});


 Promise.all([promise1, promise2, promise3,promise4,promise5]).then(function(values) {
  
for(var i=0;i<values.length;i++){
for(var j=0;j<values[i].length;j++){
  prostori.push(values[i][j][1])
  events.push(values[i][j])
}
}

prostori= Array.from(new Set(prostori));
insertEvents()
//console.log(events);
async function insertEvents(){

  connection.query = util.promisify(connection.query)
var del="DELETE FROM prostor_predmet"

var sql="INSERT INTO prostor_predmet  (predmet,prostor,start_date,end_date) VALUES ?"
//var sql='SELECT prostori_id,predmet_id,days_week,prostori.velikost,prostori.ime as prostor,predmet.ime as predmet FROM urnik.prostor_predmet  INNER JOIN prostori on prostori.id=prostor_predmet.prostori_id INNER JOIN predmet on predmet.id=prostor_predmet.predmet_id;';
//connection.query(sql,[events],function(err, results) {
 // if (err) throw err
 try{
   var data1=await connection.query(del)
   var data=await connection.query(sql,[events])
 }catch(err){
   console.log("error deleting"+err)
 }

 


console.log(data);
 ///console.log(results)
  //res.send(results);
//});
 

 
}
});

//});// cron
/*
 var data = ical.fromURL("http://www.google.com/calendar/ical/academia.si_k49so77cbr6dsalbjeovcv3poo%40group.calendar.google.com/public/basic.ics",{}, function(err, data) {
  if (err) console.log(err);
 // console.log(data);
  for (var k in data){
    if (data.hasOwnProperty(k)) {
   
      var ev = data[k];
      
      if(Date.parse(ev.start)/1000>Math.floor(new Date().getTime()/1000)){
      
        prostori.push(ev.location)
       prostori= Array.from(new Set(prostori));
     polje.push({"predmet":ev.summary,"lokacija":ev.location,"kdaj":(Date.parse(ev.start)/1000),"konec":Date.parse(ev.end)/1000})
      }
      
  
    }
  }
  //console.log(polje);
 // console.log(prostori)
});
*/


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
  var sql="SELECT DISTINCT(prostor) FROM prostor_predmet;SELECT predmet,prostor,end_date,start_date FROM urnik.prostor_predmet  order by start_date asc"
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