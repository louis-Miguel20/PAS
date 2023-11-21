import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingHomeComponent } from './pages/setting-home/setting-home.component';
import { SettingComponent } from './setting.component';

const routes: Routes = [
  {
    path:'', component: SettingComponent,

    children:[
      {
        path:'', component: SettingHomeComponent,

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
