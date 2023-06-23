import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { ControllerService } from '../controllers/controller.service';
import { UsersService } from '../users.service';
import { Users } from 'src/app/models/user-response';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  public idUser:any;
  public users:Users[]=[];
  public habilitar:boolean=false;

  constructor(private http:HttpClient,
              private router: Router,
              private _sCtrl: ControllerService,
              private _sUser: UsersService,
              // private __Parent: ParentService,
              private permissionsService: NgxPermissionsService
              ) {
                this._sCtrl.leerToken();
              }

 getToken(email:any, password:any){

  this.habilitar=true;
  this._sUser.getUsers()
  .pipe(
    finalize(()=>{
      this.habilitar=false;

       const user = this.users.find( (user) => user.email==email &&  user.password==password);

      if(user){
        this.idUser=user?.id;

        this.saveToken(user?.id, this.idUser, user?.role);
        this.router.navigate(['/home'])
      }else{
        this._sCtrl.showToastr_error('Email y/o password incorrecta')

      }
    })
  )
  .subscribe({
    next: (data)=>{
      this.users=data
      // console.log(data);
    },
    error: (error)=>{
          console.log(error);
        }
  })
}


saveToken(token:string, id:number,role:any){
  this._sCtrl.token =token;
  localStorage.setItem('token', token);
  localStorage.setItem('id', id.toString());

  if(role==="ADMIN"){
    localStorage.setItem('role', role);
    const perm = ["ADMIN"];
    this.permissionsService.loadPermissions(perm);
  }else{
    localStorage.setItem('role', role);
  }

  let hoy = new Date();
  hoy.setSeconds(86400);
  localStorage.setItem('expira', hoy.getTime().toString())
}

isAutentificado():boolean{

  if(this._sCtrl.token.length<2){
    return false;
  }
  const expira = Number(localStorage.getItem('expira'));
  const expiraDate = new Date();
  expiraDate.setTime(expira);
  if(expiraDate> new Date()){
    return true;
  }else{
    return false;
  }

}

}

