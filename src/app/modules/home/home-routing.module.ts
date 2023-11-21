import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgxPermissionsGuard, NgxPermissionsService } from 'ngx-permissions';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'users',
    component: HomeComponent,
        canActivate: [AuthGuard],
        data: { permissions: { only: ['ADMIN'], redirectTo: '/home' } },
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'record',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { permissions: { only: ['ADMIN'], redirectTo: '/home' } },
    loadChildren: () => import('./pages/record/record.module').then(m => m.RecordModule)
  },
  {
    path: 'profile',
    component: HomeComponent,
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'setting',
    component: HomeComponent,
    loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [NgxPermissionsService]
})
export class HomeRoutingModule { }
