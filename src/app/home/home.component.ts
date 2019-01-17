import { Component, OnInit, NgZone  } from '@angular/core';
import { ApiDataService } from '../apidata.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data;
  rooms;
  subject_room;
mon;tue;wen;thur;fri;sat;curr;currsec;now;test;
  constructor(private auth:ApiDataService, public zone: NgZone) { }

  ngOnInit() {
    this.podatki()
    this.curr = new Date;
    this.now = new Date;
    this.currsec=new Date().getTime();
   

  
   this.mon = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()+1));
   this.tue = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()+2));
   this.wen = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()+3));
   this.thur = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()+4));
   this. fri = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()+5));
   this.sat = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()+6));
  }
 async podatki(){
    this.data= await this.auth.get("data").toPromise()
  this.rooms=this.data[0];
  console.log(this.rooms)
  this.subject_room=this.data[1];
  }

  addweek(){
    
    var weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  
    this.mon = new Date(this.mon.setTime(this.mon.getTime() + weekInMilliseconds));
    this.tue = new Date(this.tue.setTime(this.tue.getTime() + weekInMilliseconds));
    this.wen = new Date(this.wen.setTime(this.wen.getTime() + weekInMilliseconds));
    this.thur = new Date(this.thur.setTime(this.thur.getTime() + weekInMilliseconds));
    this.fri = new Date(this.fri.setTime(this.fri.getTime() + weekInMilliseconds));
    this.sat = new Date(this.sat.setTime(this.sat.getTime() + weekInMilliseconds));
    this.zone.run(() =>   this.currsec = new Date(this.curr.setTime(this.curr.getTime() + weekInMilliseconds)).getTime())
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
  
}
