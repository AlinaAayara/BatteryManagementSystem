import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './module/admin/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './module/admin/forms/home/home.component';
import { DashboardComponent } from './module/admin/forms/dashboard/dashboard.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { FirmInfoComponent } from './module/admin/forms/firm-info/firm-info.component';
import { BasicCategoryComponent } from './module/admin/forms/basic-category/basic-category.component';
import { ProductInfoComponent } from './module/admin/forms/product-info/product-info.component';


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
          },
          {
            path: 'BasicCategory', component: BasicCategoryComponent
          },
          {
            path: 'ProductInfo', component: ProductInfoComponent
          }
        ]
      },
      {
        path: 'FirmInfo', component: FirmInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
