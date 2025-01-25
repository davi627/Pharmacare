import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandindPageComponent } from './landind-page/landind-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { PharmacistPageComponent } from './pharmacist-page/pharmacist-page.component';
import { ProductsComponent } from './products/products.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';

@NgModule({
  declarations: [
    AppComponent,
    LandindPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AdminPageComponent,
    CustomerPageComponent,
    PharmacistPageComponent,
    ProductsComponent,
    AppointmentsComponent,
    PrescriptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
