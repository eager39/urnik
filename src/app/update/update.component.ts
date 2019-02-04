import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../apidata.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private _dataService:ApiDataService) { }
data;
 async ngOnInit() {
    this.data= await this._dataService.get("updateUrnik").toPromise()
    console.log(this.data)
  }

}
