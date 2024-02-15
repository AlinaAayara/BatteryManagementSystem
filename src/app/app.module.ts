import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlideInComponent } from './common/slide-in/slide-in.component';
import { BasicCenterComponent } from './module/admin/forms/basic-center/basic-center.component';
import { FormattedTableComponent } from './common/controls/tables/formatted-table/formatted-table.component';
import { SimpleTabsComponent } from './common/controls/tabs/simple-tabs/simple-tabs.component';
import { SimpleAccordionComponent } from './common/controls/accordion/simple-accordion/simple-accordion.component';
import { SimpleDropdownComponent } from './common/controls/dropdown/simple-dropdown/simple-dropdown.component';
import { LoginComponent } from './module/admin/login/login.component';
import { HomeComponent } from './module/admin/forms/home/home.component';
import { DashboardComponent } from './module/admin/forms/dashboard/dashboard.component';
import { SimpleTextBoxComponent } from './common/controls/simple-text-box/simple-text-box.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptInterceptor } from './config/http-intercept.interceptor';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { FirmInfoComponent } from './module/admin/forms/firm-info/firm-info.component';
import { SideBarComponent } from './module/admin/forms/side-bar/side-bar.component';
import { BasicCategoryComponent } from './module/admin/forms/basic-category/basic-category.component';
import { SmartFormComponent } from './common/smart-form/smart-form.component';
import { SimpleTableComponent } from './common/controls/tables/simple-table/simple-table/simple-table.component';
import { ProductInfoComponent } from './module/admin/forms/product-info/product-info.component';
import { PartyInfoComponent } from './module/admin/forms/party-info/party-info.component';
import { BasicBranchComponent } from './module/admin/forms/basic-branch/basic-branch.component';
import { AlphaNumericDirective } from './core/directives/alpha-numeric.directive';
import { AlphaOnlyDirective } from './core/directives/alpha-only.directive';
import { AlphaSpaceOnlyDirective } from './core/directives/alpha-space-only.directive';
import { AutofocusDirective } from './core/directives/autofocus.directive';
import { NumberOnlyDirective } from './core/directives/number-only.directive';
import { PurchaseInfoComponent } from './module/admin/forms/purchase-info/purchase-info.component';
import { CustomerInfoComponent } from './module/admin/forms/customer-info/customer-info.component';
import { CustomerSearchComponent } from './module/admin/forms/customer-info/customer-search/customer-search.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { SaleInfoComponent } from './module/admin/forms/sale-info/sale-info.component';
import { PartySearchComponent } from './module/admin/forms/party-info/party-search/party-search.component';
import { AdvanceCustomerSearchComponent } from './module/admin/forms/advance-customer-search/advance-customer-search.component';
import { PurchaseSearchComponent } from './module/admin/forms/advance-customer-search/purchase-search/purchase-search.component';
import { SaleSearchComponent } from './module/admin/forms/advance-customer-search/sale-search/sale-search.component';
import { WarrantyInfoComponent } from './module/admin/forms/warranty-info/warranty-info.component';
import { WarrantySearchComponent } from './module/admin/forms/advance-customer-search/warranty-search/warranty-search.component';
import { SaleReturnInfoComponent } from './module/admin/forms/sale-return-info/sale-return-info.component';
import { OldBatteryInfoComponent } from './module/admin/forms/old-battery-info/old-battery-info.component';
import { DateDirective } from './core/directives/date.directive';
import { WarrantyReturnInfoComponent } from './module/admin/forms/warranty-return-info/warranty-return-info.component';
import { BasicGroupComponent } from './module/admin/forms/basic-group/basic-group.component';
import { ReportViewerComponent } from './module/admin/reports/report-viewer/report-viewer.component';
import { BasicAmpComponent } from './module/admin/forms/basic-amp/basic-amp.component';
import { EnterFocusDirective } from './core/directives/enter-focus.directive';
import { ReportsComponent } from './module/admin/reports/reports/reports.component';
import { PartyTransactionInfoComponent } from './module/admin/forms/party-transaction-info/party-transaction-info.component';
import { CustomerTransactionInfoComponent } from './module/admin/forms/customer-transaction-info/customer-transaction-info.component';
import { ExpenseInfoComponent } from './module/admin/forms/expense-info/expense-info.component';
import { DistributorInfoComponent } from './module/Manufacturer/forms/distributor-info/distributor-info.component';
import { DealerInfoComponent } from './module/Distributor/forms/dealer-info/dealer-info.component';
import { ManufacturerPriceInfoComponent } from './module/Manufacturer/forms/manufacturer-price-info/manufacturer-price-info.component';
import { DistributorPriceInfoComponent } from './module/Distributor/forms/distributor-price-info/distributor-price-info.component';
import { DealerPriceInfoComponent } from './module/Dealer/forms/dealer-price-info/dealer-price-info.component';
import { ManufacturerPurchaseInfoComponent } from './module/Manufacturer/forms/manufacturer-purchase-info/manufacturer-purchase-info.component';
import { DistributorSearchComponent } from './module/Manufacturer/forms/distributor-info/distributor-search/distributor-search.component';
import { DistributorModelComponent } from './common/component/distributor-model/distributor-model.component';
import { PurchaseInfoCommonComponent } from './common/component/purchase-info-common/purchase-info-common.component';
import { ManufacturerSaleInfoComponent } from './module/Manufacturer/forms/manufacturer-sale-info/manufacturer-sale-info.component';
import { SaleInfoCommonComponent } from './common/component/sale-info-common/sale-info-common.component';
import { CustomerModelComponent } from './common/component/customer-model/customer-model.component';
import { PurchaseInwardInfoCommonComponent } from './common/component/purchase-inward-info-common/purchase-inward-info-common.component';
import { PurchaseInwardInfoComponent } from './module/Distributor/forms/purchase-inward-info/purchase-inward-info.component';
import { DistributorSaleInfoComponent } from './module/Distributor/forms/distributor-sale-info/distributor-sale-info.component';
import { DealerSearchComponent } from './module/Distributor/forms/dealer-info/dealer-search/dealer-search.component';
import { DistributorTransactionInfoComponent } from './module/Manufacturer/forms/distributor-transaction-info/distributor-transaction-info.component';
import { PartyTransactionInfoCommonComponent } from './common/component/party-transaction-info-common/party-transaction-info-common.component';
import { DealerTransactionInfoComponent } from './module/Distributor/forms/dealer-transaction-info/dealer-transaction-info.component';
import { BasicBankCommonComponent } from './common/component/basic-bank-common/basic-bank-common.component';
import { BasicBankComponent } from './module/admin/forms/basic-bank/basic-bank.component';
import { BankTransactionInfoCommonComponent } from './common/component/bank-transaction-info-common/bank-transaction-info-common.component';
import { BankTransactionInfoComponent } from './module/admin/forms/bank-transaction-info/bank-transaction-info.component';
import { ManufacturerDashboardComponent } from './module/Manufacturer/forms/manufacturer-dashboard/manufacturer-dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    SlideInComponent,
    BasicCenterComponent,
    FormattedTableComponent,
    SimpleTabsComponent,
    SimpleAccordionComponent,
    SimpleDropdownComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    SimpleTextBoxComponent,
    FirmInfoComponent,
    SideBarComponent,
    BasicCategoryComponent,
    SmartFormComponent,
    SimpleTableComponent,
    ProductInfoComponent,
    PartyInfoComponent,
    BasicBranchComponent,

    AlphaNumericDirective, NumberOnlyDirective, AlphaOnlyDirective, AlphaSpaceOnlyDirective, AutofocusDirective, PurchaseInfoComponent, CustomerInfoComponent, CustomerSearchComponent, SaleInfoComponent, PartySearchComponent, AdvanceCustomerSearchComponent, PurchaseSearchComponent, SaleSearchComponent, WarrantyInfoComponent, WarrantySearchComponent, SaleReturnInfoComponent, OldBatteryInfoComponent, DateDirective, WarrantyReturnInfoComponent, BasicGroupComponent, ReportViewerComponent, BasicAmpComponent, EnterFocusDirective, ReportsComponent, PartyTransactionInfoComponent, CustomerTransactionInfoComponent, ExpenseInfoComponent, DistributorInfoComponent, DealerInfoComponent, ManufacturerPriceInfoComponent, DistributorPriceInfoComponent, DealerPriceInfoComponent, ManufacturerPurchaseInfoComponent, DistributorSearchComponent, DistributorModelComponent, PurchaseInfoCommonComponent, ManufacturerSaleInfoComponent, SaleInfoCommonComponent, CustomerModelComponent, PurchaseInwardInfoCommonComponent, PurchaseInwardInfoComponent, DistributorSaleInfoComponent, DealerSearchComponent, DistributorTransactionInfoComponent, PartyTransactionInfoCommonComponent, DealerTransactionInfoComponent, BasicBankCommonComponent, BasicBankComponent, BankTransactionInfoCommonComponent, BankTransactionInfoComponent, ManufacturerDashboardComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule 
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptInterceptor, multi: true }, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, AuthGuardGuard, JwtHelperService,MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
