import { Component, Input } from '@angular/core';
import { Schedule } from 'src/app/models/horario-response';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() schedule:Schedule[]=[];

}
