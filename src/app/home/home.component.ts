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
st=0;
  ngOnInit() {
    
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
  var today=new Date();
  var ago7=today.setDate(today.getDate() - 7);
  
  console.log(this.subject_room)
 
    this.data= await this.auth.get("data").toPromise()
  this.rooms=this.data[0];
  console.log(this.rooms)
 
  for(var i=0;i<this.data[1].length;i++){
    
    if(Math.floor(ago7)>this.data[1][i].start_date && this.sat.getTime()/1000>this.data[1][i].start_date){
      console.log(this.data[1][i].start_date)
      if(Math.floor(this.sun.getTime()/1000)<this.data[1][i].start_date && this.sat.getTime()/1000>this.data[1][i].start_date){
        console.log(this.sun)
        this.st++;
      }
       this.subject_room.push(this.data[1][i]);
    }
  }
  console.log(this.subject_room)
 
  }

  addweek(){
    this.subject_room.length=0;
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
    this.subject_room.length=0;
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
    //console.log(item.setHours(0,0,0,0) +" VS"+ this.test.getTime())
    //alert(item)
   // return this.test

  }
   
  pickWeek(){
   var selected;
   var weekInMilliseconds;
   var sign;
   this.st=0;
    selected=new Date(this.weekForm.value.week).setHours(0,0,0,0)
   if(this.sat.setHours(0,0,0,0)<selected){
    var timeDiff = Math.abs(selected - this.curr);
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
     weekInMilliseconds = diffDays * 24 * 60 * 60 * 1000;
     this.sun = new Date(this.sun.setTime(this.sun.getTime() + weekInMilliseconds));
    this.mon = new Date(this.mon.setTime(this.mon.getTime()+  weekInMilliseconds));
    this.tue = new Date(this.tue.setTime(this.tue.getTime() + weekInMilliseconds));
    this.wen = new Date(this.wen.setTime(this.wen.getTime() +  weekInMilliseconds));
    this.thur = new Date(this.thur.setTime(this.thur.getTime() +  weekInMilliseconds));
    this.fri = new Date(this.fri.setTime(this.fri.getTime() +  weekInMilliseconds));
    this.sat = new Date(this.sat.setTime(this.sat.getTime() +  weekInMilliseconds));
     this.curr.setTime(this.curr.getTime() +  weekInMilliseconds)


   }else{
    var timeDiff = Math.abs( this.curr-selected );
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    
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
