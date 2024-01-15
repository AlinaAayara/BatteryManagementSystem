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
import { PartyInfoComponent } from './module/admin/forms/party-info/party-info.component';
import { BasicBranchComponent } from './module/admin/forms/basic-branch/basic-branch.component';
import { PurchaseInfoComponent } from './module/admin/forms/purchase-info/purchase-info.component';
import { CustomerInfoComponent } from './module/admin/forms/customer-info/customer-info.component';
import { SaleInfoComponent } from './module/admin/forms/sale-info/sale-info.component';
import { WarrantyInfoComponent } from './module/admin/forms/warranty-info/warranty-info.component';
import { SaleReturnInfoComponent } from './module/admin/forms/sale-return-info/sale-return-info.component';
import { OldBatteryInfoComponent } from './module/admin/forms/old-battery-info/old-battery-info.component';
import { WarrantyReturnInfoComponent } from './module/admin/forms/warranty-return-info/warranty-return-info.component';
import { BasicGroupComponent } from './module/admin/forms/basic-group/basic-group.component';
import { ReportViewerComponent } from './module/admin/reports/report-viewer/report-viewer.component';
import { BasicAmpComponent } from './module/admin/forms/basic-amp/basic-amp.component';
import { ReportsComponent } from './module/admin/reports/reports/reports.component';
import { PartyTransactionInfoComponent } from './module/admin/forms/party-transaction-info/party-transaction-info.component';
import { CustomerTransactionInfoComponent } from './module/admin/forms/customer-transaction-info/customer-transaction-info.component';
import { ExpenseInfoComponent } from './module/admin/forms/expense-info/expense-info.component';


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
          },
          {
            path: 'PartyInfo', component: PartyInfoComponent
          },
          {
            path: 'BasicBranch', component: BasicBranchComponent
          },
          {
            path: 'PurchaseInfo', component: PurchaseInfoComponent
          },
          {
            path: 'CustomerInfo', component: CustomerInfoComponent
          },
          {
            path: 'SaleInfo', component: SaleInfoComponent
          },
          {
            path: 'WarrantyInfo', component: WarrantyInfoComponent
          },
          {
            path: 'SaleReturnInfo', component: SaleReturnInfoComponent
          },
          {
            path: 'OldBatteryInfo', component: OldBatteryInfoComponent
          },
          {
            path: 'WarrantyReturnInfo', component: WarrantyReturnInfoComponent
          },
          {
            path: 'BasicGroup', component: BasicGroupComponent
          },
          {
            path: 'ReportViewer', component: ReportViewerComponent
          },
          {
            path: 'BasicAmp', component: BasicAmpComponent
          },
          {
            path: 'Reports', component: ReportsComponent
          },
          {
            path: 'PartyTransactionInfo', component: PartyTransactionInfoComponent
          },
          {
            path: 'CustomerTransactionInfo', component: CustomerTransactionInfoComponent
          },
          {
            path: 'ExpenseInfo', component: ExpenseInfoComponent
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
