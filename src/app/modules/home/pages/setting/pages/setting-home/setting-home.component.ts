import { Component, OnInit } from '@angular/core';
import { TimbreService } from '../../../../../../services/timbre.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControllerService } from 'src/app/services/controllers/controller.service';

@Component({
  selector: 'app-setting-home',
  templateUrl: './setting-home.component.html',
  styleUrls: ['./setting-home.component.scss']
})
export class SettingHomeComponent implements OnInit {
  step = 0;
  public formu!:    FormGroup;
  constructor(
    private _SH: TimbreService,
    private form     : FormBuilder,
    private _Sctr :ControllerService
  ){

  }
  ngOnInit(): void {
    this.createformStep1();
    this.getConfig();
  }

  createformStep1(){
    this.formu= this.form.group({
      kilowatt: ["", [Validators.required], []]
    })
  }
  loadFormstem1(formu:any){
    this.formu.reset({
      kilowatt: formu.kilowatt
    })
  }
  enviar(){
    if(this.formu.invalid){
      this._Sctr.showToastr_error("Verifique que los campos sean validos");
      return;
    }
    this._SH.putHorario(1, this.formu.value)
    .subscribe({
      next: (resp:any) => {
        this.loadFormstem1(resp);
        this._Sctr.showToastr_success("Configuración de motobomba actualizada");
      },
      error: (error) => {
        console.log(error);
      }
    })

  }
  getConfig(){
    this._SH.getHorarioId(1)
    .subscribe({
      next: (resp:any) => {
        this.loadFormstem1(resp);
      },
      error: (error) => {
        this._Sctr.showToastr_error(error);
      }
    })
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
