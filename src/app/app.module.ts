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
    SimpleTextBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptInterceptor, multi: true },{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, AuthGuardGuard, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
