const express = require('express')
var bodyParser = require("body-parser")
var cors = require('cors')
var schedule = require('node-schedule')
var mysql = require('mysql')
const app = express()
var conf = require('./config')
conf = new conf();
var util = require('util')
var ical = require('node-ical')
var now = new Date();
var connection = mysql.createConnection({
   host: 'localhost',
   user: conf.DBuser,
   password: conf.DBpass,
   database: conf.database,
   multipleStatements: true
})

function updateUrnik() {
   return new Promise(function(resolve, reject) {
      var events = [];
      var polje1 = [],
          polje2 = [],
          polje3 = [],
          polje4 = [],
          polje5 = [];
      var prostori = [];
      var today = new Date();
      var ago7 = today.setDate(today.getDate() - 7);
      console.log(ago7)
      var promise1 = new Promise(function(resolve, reject) {
         var data = ical.fromURL("http://www.google.com/calendar/ical/academia.si_k49so77cbr6dsalbjeovcv3poo%40group.calendar.google.com/public/basic.ics", {}, function(err, data) {
            if (err) reject(err);
            values = data
            for (var k in values) {
               if (values.hasOwnProperty(k)) {
                  var ev = values[k];
                  if ((Date.parse(ev.start)) / 1000 > (Math.floor(ago7 / 1000))) {
                     polje1.push([ev.summary, ev.location, (Date.parse(ev.start) / 1000), (Date.parse(ev.end) / 1000), "Ekonomist"])
                  }
               }
            }
            resolve(polje1);
         });
      });
      var promise2 = new Promise(function(resolve, reject) {
         var data = ical.fromURL("http://www.google.com/calendar/ical/academia.si_psb3atemfrjhvmqb5bkafjpmk4%40group.calendar.google.com/public/basic.ics", {}, function(err, data) {
            if (err) reject(err);
            values = data
            for (var k in values) {
               if (values.hasOwnProperty(k)) {
                  var ev = values[k];
                  if ((Date.parse(ev.start)) / 1000 > (Math.floor(ago7 / 1000))) {
                     polje2.push([ev.summary, ev.location, (Date.parse(ev.start) / 1000), (Date.parse(ev.end) / 1000), "Gradbenistvo"])
                  }
               }
            }
            resolve(polje2);
         });
      });
      var promise3 = new Promise(function(resolve, reject) {
         var data = ical.fromURL("http://www.google.com/calendar/ical/academia.si_i0t07ofv6vpvclbgp82iugvpgo%40group.calendar.google.com/public/basic.ics", {}, function(err, data) {
            if (err) reject(err);
            values = data
            for (var k in values) {
               if (values.hasOwnProperty(k)) {
                  var ev = values[k];
                  if ((Date.parse(ev.start)) / 1000 > (Math.floor(ago7 / 1000))) {
                     polje3.push([ev.summary, ev.location, (Date.parse(ev.start) / 1000), (Date.parse(ev.end) / 1000), "Medijska produkcija"])
                  }
               }
            }
            resolve(polje3);
         });
      });
      var promise4 = new Promise(function(resolve, reject) {
         var data = ical.fromURL("http://www.google.com/calendar/ical/academia.si_uql954u28t4n27tfactj7j5i04%40group.calendar.google.com/public/basic.ics", {}, function(err, data) {
            if (err) reject(err);
            values = data
            for (var k in values) {
               if (values.hasOwnProperty(k)) {
                  var ev = values[k];
                  if ((Date.parse(ev.start)) / 1000 > (Math.floor(ago7 / 1000))) {
                     polje4.push([ev.summary, ev.location, (Date.parse(ev.start) / 1000), (Date.parse(ev.end) / 1000), "Strojnistvo"])
                  }
               }
            }
            resolve(polje4);
         });
      });
      var promise5 = new Promise(function(resolve, reject) {
         var data = ical.fromURL("http://www.google.com/calendar/ical/academia.si_0i01hedl2iac2klrbvlhuj61q8%40group.calendar.google.com/public/basic.ics", {}, function(err, data) {
            if (err) reject(err);
            values = data
            for (var k in values) {
               if (values.hasOwnProperty(k)) {
                  var ev = values[k];
                  if ((Date.parse(ev.start)) / 1000 > (Math.floor(ago7 / 1000))) {
                     polje5.push([ev.summary, ev.location, (Date.parse(ev.start) / 1000), (Date.parse(ev.end) / 1000), "Varovanje"])
                  }
               }
            }
            resolve(polje5);
         });
      });
      Promise.all([promise1, promise2, promise3, promise4, promise5]).then(function(values) {
         for (var i = 0; i < values.length; i++) {
            for (var j = 0; j < values[i].length; j++) {
               prostori.push(values[i][j][1])
               if (values[i][j].includes(NaN)) {} else {
                  events.push(values[i][j])
               }
            }
         }
         prostori = Array.from(new Set(prostori));
         console.log(events);
         connection.query = util.promisify(connection.query)
         var del = "DELETE FROM prostor_predmet"
         var sql = "INSERT INTO prostor_predmet  (predmet,prostor,start_date,end_date,smer) VALUES ?"
         connection.beginTransaction(function(err) {
            insertEvents()
            async function insertEvents() {
               try {
                  var data1 = await connection.query(del)
                  var data = await connection.query(sql, [events])
                  connection.commit(function(err) {
                     console.log('Transaction Complete.');
                     resolve(true);
                  });
               } catch (err) {
                  console.log("error deleting" + err)
                  connection.rollback(function() {
                     console.log("rollback")
                     reject(false)
                  });
               }
            }
         });
      }, (error) => {
         console.log("prislo je do napake pri pridobivanju podatkov" + error)
      });
   })
} //function updateUrnik
var j = schedule.scheduleJob('0 0 0 * * *', function() {
   updateUrnik()
}); // cron

connection.connect(function(err) {
   if (err) {
      console.log("Napaka v povezavi do baze");
   } else {
      console.log('You are now connected...')
   }
})
app.use(cors());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());
app.get('/data', function(req, res) {
   var sql = "SELECT ime as prostor,value,nad FROM prostori;SELECT smer,predmet,prostor,end_date,start_date FROM prostor_predmet  order by start_date asc "
   connection.query(sql, function(err, results) {
      if (err) throw err
      console.log(results)
      res.send(results);
   });
}, err => {
   console.log("Error " + err);
});
app.get("/updateUrnik", function(req, res) {
   updateUrnik().then(function(values) {
      if (values == true) {
         res.json("Urnik je posodobljen")
      }
   })
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))