import { Component } from '@angular/core';
import { Dth11Service } from 'src/app/services/dth11.service';

@Component({
  selector: 'app-dth',
  templateUrl: './dth.component.html',
  styleUrls: ['./dth.component.scss']
})
export class DTHComponent {
  public tem:number=40;
  public hum:number=90;

  constructor(private _sdth11:Dth11Service) {
    this.getDth()
  }

  getDth(){
    this._sdth11.getDTH11()
    .subscribe({
      next: (data) => {
        console.log(data);
              this.tem = data[data.length-1].tem;
              this.hum = data[data.length-1].hum;
            },
      error: (err) => {
      console.log(err);
      }
    })
  }

}
