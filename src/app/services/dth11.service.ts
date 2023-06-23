import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dth11 } from '../models/dth-response';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Dth11Service {
  api:string="https://irrigatioiot-default-rtdb.firebaseio.com";
  constructor(private http: HttpClient) { }

  getDTH11():Observable<Dth11[]>{
    return this.http.get<any>(`${this.api}/dth.json`)
    .pipe(
      map((resp:any)=>{
        return this.createArray(resp);
      })
    );
  }

  deleteDTH11(id:any):Observable<any>{
    return this.http.delete<any>(`${this.api}/dth/${id}.json`);
  }

  private createArray(DTh11Obj:any):Dth11[] {
    const DTh11:Dth11[]=[];
    if(DTh11Obj ===null){return [];};
    Object.keys(DTh11Obj).forEach((key:any)=>{
      const dth:Dth11 = DTh11Obj[key];
      dth.id=key;

      DTh11.push(dth);
    })
    return DTh11;
  }
}
