import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandindPageComponent } from './landind-page/landind-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { PharmacistPageComponent } from './pharmacist-page/pharmacist-page.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { ProductsComponent } from './products/products.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { ReportsComponent } from './reports/reports.component';


const routes: Routes = [
  {path:'',component:LandindPageComponent},
  {path:'register',component:RegisterPageComponent},
  {path:'admin',component:AdminPageComponent},
  {path:'pharmacist',component:PharmacistPageComponent},
  {path:'customer',component:CustomerPageComponent},
  {path:'products',component:ProductsComponent},
  {path:'appointments',component:AppointmentsComponent},
  {path:'prescriptions',component:PrescriptionsComponent},
  {path:'reports',component:ReportsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
