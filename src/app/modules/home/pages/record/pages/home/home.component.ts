import { Component, OnInit } from '@angular/core';
import { Record } from 'src/app/models/record-reponse';
import { ControllerService } from 'src/app/services/controllers/controller.service';
import { RecordService } from 'src/app/services/record.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
  record:Record[]=[];
  bus:any[]=[];
  constructor(private _Srecord: RecordService,
    private _Sctr:ControllerService
    ){
      this._Sctr.leerRole()
    this.getRecords()
  }
  ngOnInit(): void {

  }

  getRecords(){
    this._Srecord.getrecord().subscribe({
      next: (data) => {
        this.record=data
        console.log(this.record);

        if(this.record.length > 10){
          const recor = this.record.slice(this.record.length - 10);
          this.record=recor
        }else{
          this.record=data

        }
            },
      error: (err) => {
              console.log(err);
            }
    })
  }

  buscar(fecha:any){
    this.bus=[];
    let org =fecha;
    let f=[];

    // let bs =this.record;
    org=org.split('/');
    f.push(org[1], org[0], org[2]);
    org=f.join('/')
    console.log(org);

    const bs = this.record.filter((ele:any)=>{

      return ele.update_date===org
    })

    console.log(bs);
    bs.forEach((ele:any)=>{
      this.bus.push(ele)
    })


  }
}
