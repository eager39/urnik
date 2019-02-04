import { Component, OnInit, NgZone  } from '@angular/core';
import { ApiDataService } from '../apidata.service';
import {FormControl,FormGroup} from '@angular/forms'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stevilo=0;
  data;
  rooms;
  subject_room=[];
mon;tue;wen;thur;fri;sat;curr;currsec;now;test;sun;

  constructor(private auth:ApiDataService, public zone: NgZone
    ) {
     
   }
   weekForm=new FormGroup({
    week: new FormControl()
  })
  interval;
st=0;
vt=0;
diff=0;
  ngOnInit() {
    this.interval = setInterval(() => {
      this.podatki();
  }, 60000);
    this.podatki()
    this.curr = new Date;
    this.now = new Date;
    this.currsec=new Date().getTime();
   

    this.sun = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()));
   this.mon = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()+1));
   this.tue = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()+2));
   this.wen = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()+3));
   this.thur = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()+4));
   this. fri = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()+5));
   this.sat = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()+6));
  }
 
 async podatki(){
   var kdaj;
   var timesmon=0;
   var timestue=0;
   var timeswen=0;
   var timesthur=0;
   var timesfri=0;
   var timessat=0;
   var dan;
  var today=new Date();
  var ago7=today.setDate(today.getDate() - 7);
  
  console.log(this.subject_room=new Array())
 
    this.data= await this.auth.get("data").toPromise()
  this.rooms=this.data[0];
  console.log(this.rooms)
 
  for(var i=0;i<this.data[1].length;i++){
    
  
      kdaj=this.data[1][i].start_date;
     dan=new Date(kdaj*1000).getDate();
      if(Math.floor(this.sun.getTime()/1000)<this.data[1][i].start_date && this.sat.getTime()/1000>this.data[1][i].start_date){
          if(dan==this.mon.getDate()){
            timesmon++;
          }
          if(dan==this.tue.getDate()){
            timestue++;
          }
          if(dan==this.wen.getDate()){
            timeswen++;
          }
          if(dan==this.thur.getDate()){
            timesthur++;
          }
          if(dan==this.fri.getDate()){
            timesfri++;
          }
          if(dan==this.sat.getDate()){
            timessat++;
          }
         
        
         this.subject_room.push(this.data[1][i]);
        this.st++;
      }
      
    
  }
 this.vt=Math.max(timesmon,timestue,timeswen,timesthur,timesfri,timessat);
  console.log(this.subject_room)
  if(this.st>18 || this.vt>5){
  
    this.diff=5;
  
  }else{
    this.diff=0;
  }
 
  }

  addweek(){
    this.subject_room=new Array();
    this.st=0;
    var weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    this.sun = new Date(this.sun.setTime(this.sun.getTime() + weekInMilliseconds));
    this.mon = new Date(this.mon.setTime(this.mon.getTime() + weekInMilliseconds));
    this.tue = new Date(this.tue.setTime(this.tue.getTime() + weekInMilliseconds));
    this.wen = new Date(this.wen.setTime(this.wen.getTime() + weekInMilliseconds));
    this.thur = new Date(this.thur.setTime(this.thur.getTime() + weekInMilliseconds));
    this.fri = new Date(this.fri.setTime(this.fri.getTime() + weekInMilliseconds));
    this.sat = new Date(this.sat.setTime(this.sat.getTime() + weekInMilliseconds));
     this.curr.setTime(this.curr.getTime() + weekInMilliseconds)
    this.podatki()
    
   
  }
  removeweek(){
    this.subject_room=new Array();
    this.st=0;
    var weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    this.sun = new Date(this.sun.setTime(this.sun.getTime() - weekInMilliseconds));
    this.mon = new Date(this.mon.setTime(this.mon.getTime() - weekInMilliseconds));
    this.tue = new Date(this.tue.setTime(this.tue.getTime() - weekInMilliseconds));
    this.wen = new Date(this.wen.setTime(this.wen.getTime() - weekInMilliseconds));
    this.thur = new Date(this.thur.setTime(this.thur.getTime() - weekInMilliseconds));
    this.fri = new Date(this.fri.setTime(this.fri.getTime() - weekInMilliseconds));
    this.sat = new Date(this.sat.setTime(this.sat.getTime() - weekInMilliseconds));
     this.curr.setTime(this.curr.getTime() - weekInMilliseconds)
    this.podatki()
  
    
  }
  danes(a,item){
    this.test = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()+1));
   
    this.test= new Date(this.test.setDate(this.test.getDate()+a));
    this.test.setHours(0,0,0,0)
   item=new Date(item*1000)
   item.setHours(0,0,0,0)
    if(item.getTime() == this.test.getTime()){
      return true
    }


  }
   
  pickWeek(){
   var selected;
   var weekInMilliseconds;
   this.st=0;
    selected=new Date(this.weekForm.value.week).setHours(0,0,0,0)
    selected=new Date(selected)
    selected = new Date(selected.setDate(selected.getDate() - selected.getDay()+1));
    console.log(selected)
    this.subject_room=new Array();
   if(this.sat.setHours(0,0,0,0)<selected){
   
    var timeDiff = Math.abs(selected - this.curr);
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
   console.log(diffDays)
     weekInMilliseconds = diffDays * 24 * 60 * 60 * 1000;
     this.sun = new Date(selected.setDate(selected.getDate() - selected.getDay()));
     this.mon = new Date(selected.setDate(selected.getDate() - selected.getDay()+1));
     this.tue = new Date(selected.setDate(selected.getDate() - selected.getDay()+2));
     this.wen = new Date(selected.setDate(selected.getDate() - selected.getDay()+3));
     this.thur = new Date(selected.setDate(selected.getDate() - selected.getDay()+4));
     this. fri = new Date(selected.setDate(selected.getDate() - selected.getDay()+5));
     this.sat = new Date(selected.setDate(selected.getDate() - selected.getDay()+6));
     this.curr.setTime(this.curr.getTime() +  weekInMilliseconds)
   

   }else{
    var timeDiff = Math.abs( this.curr-selected );
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    console.log(diffDays)
     weekInMilliseconds = diffDays * 24 * 60 * 60 * 1000;
     this.sun = new Date(this.sun.setTime(this.sun.getTime() - weekInMilliseconds));
     this.mon = new Date(this.mon.setTime(this.mon.getTime()-  weekInMilliseconds));
     this.tue = new Date(this.tue.setTime(this.tue.getTime() - weekInMilliseconds));
     this.wen = new Date(this.wen.setTime(this.wen.getTime() -  weekInMilliseconds));
     this.thur = new Date(this.thur.setTime(this.thur.getTime() -  weekInMilliseconds));
     this.fri = new Date(this.fri.setTime(this.fri.getTime() -  weekInMilliseconds));
     this.sat = new Date(this.sat.setTime(this.sat.getTime() -  weekInMilliseconds));
      this.curr.setTime(this.curr.getTime() -  weekInMilliseconds)
     
   }
   
   this.podatki()
    
    
    
   
  }


  
  
}
