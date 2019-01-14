import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../apidata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data;
  constructor(private auth:ApiDataService) { }

  ngOnInit() {
    this.podatki()
  }
 async podatki(){
    this.data= await this.auth.get("data").toPromise()
  }
}
