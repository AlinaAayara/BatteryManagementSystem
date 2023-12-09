import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './module/admin/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './module/admin/forms/home/home.component';
import { DashboardComponent } from './module/admin/forms/dashboard/dashboard.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';


const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      {
        path: '', component: LoginComponent
      },
      {
        path: 'Login', component: LoginComponent
      },
      {
        path: 'Home', component: HomeComponent, canActivate: [AuthGuardGuard],
        children: [
          {
            path: '', component: DashboardComponent, canActivate: [AuthGuardGuard]
          },
          {
            path: 'Dashboard', component: DashboardComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
