import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Horario } from 'src/app/models/horario-response';
import { Dth11Service } from 'src/app/services/dth11.service';
import { Schedule } from '../../../models/horario-response';

@Component({
  selector: 'app-dth',
  templateUrl: './dth.component.html',
  styleUrls: ['./dth.component.scss']
})
export class DTHComponent implements OnInit{
  @Input() activar !:boolean;
  @Input() infoHorario !:Horario;
  isRange!:boolean;
  public tem:number=40;
  public hum:number=90;

  constructor(private _sdth11:Dth11Service) {
    this.getDth();
    setInterval(()=>{
      this.getDth();
     this.isRange = this.obtenerHoraMilitar(this.infoHorario.schedules);
     console.log(this.isRange);

    },5000)
  }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['infoHorario'].currentValue){
      console.log(this.infoHorario);

    }
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
obtenerHoraMilitar(Schedule: Schedule[]): boolean {
    const ahora = new Date();
    let horas: any = ahora.getHours();
    let minutos: any = ahora.getMinutes();
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    const horaMilitar = horas + ':' + minutos;

    let verificar: boolean = false;

    for (const element of Schedule || []) {
      if (horaMilitar >= element.start_time && horaMilitar <= element.end_time) {
        verificar = true;
        break; // Exit the loop when a match is found
      }
    }


    return verificar;
  }

}
