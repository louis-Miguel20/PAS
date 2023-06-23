import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Horario } from '../models/horario-response';

@Injectable({
  providedIn: 'root'
})
export class TimbreService {

  api:string="https://6494838f0da866a95367e700.mockapi.io"

  constructor(private http: HttpClient) { }

  getHorario():Observable<Horario[]>{
    return this.http.get<Horario[]>(`${this.api}/schedule`)
  }

  getHorarioId(id:any):Observable<Horario>{
    return this.http.get<Horario>(`${this.api}/schedule/${id}`);
  }
  postHorario(horario:Horario):Observable<Horario>{
    return this.http.post<Horario>(`${this.api}/schedule`, horario);
  }
  putHorario(id:any, horario:any):Observable<Horario>{
    return this.http.put<Horario>(`${this.api}/schedule/${id}`, horario);
  }
  deleteHorario(id:any):Observable<any>{
    return this.http.delete<any>(`${this.api}/schedule/${id}`);
  }

}
