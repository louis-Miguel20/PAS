import { Component, OnInit } from '@angular/core';
import { Record } from 'src/app/models/record-reponse';
import { RecordService } from 'src/app/services/record.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
  record:Record[]=[];
  constructor(private _Srecord: RecordService){
    this.getRecords()
  }
  ngOnInit(): void {

  }

  getRecords(){
    this._Srecord.getrecord().subscribe({
      next: (data) => {
        this.record=data
            },
      error: (err) => {
              console.log(err);
            }
    })
  }
}
