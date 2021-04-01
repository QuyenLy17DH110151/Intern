import { AuthGuard } from './../../auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
  },
<<<<<<< HEAD
=======
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuard]
  }
>>>>>>> 56e86231d1205416ef82132fc24e5647ae04e41d
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
