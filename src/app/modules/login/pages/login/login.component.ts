import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ControllerService } from 'src/app/services/controllers/controller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formu!:FormGroup;
  hide = true;
  constructor(private form: FormBuilder,
              private router: Router,
              public _sAuth   : AuthService,
              private _sCtrl   : ControllerService,) { }

  ngOnInit(): void {
    this.createForm();
    this.loadForm();
  }

  public get emailNoValid(){   return this.formu.get('email')?.invalid    && this.formu.get('email')?.touched;};
  public get passwordNoValid(){return this.formu.get('password')?.invalid && this.formu.get('password')?.touched;};
  createForm(){
    this.formu=this.form.group({
      email    : ["", [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")],[]],
      password : ["", [Validators.required,Validators.minLength(1)],[]]
    })
  }

  loadForm(){
    this.formu.reset({
      email    :'',
      password :'',
    })
  }
  login(){
    if(this.formu.invalid){

      return Object.values(this.formu.controls).forEach(controls=>{
        controls.markAllAsTouched()
      })
    }else{
      console.log(this.formu.value?.email);
      console.log(this.formu.value?.password);
      this._sAuth.getToken(this.formu.value?.email, this.formu.value?.password);
    }
  }
}

