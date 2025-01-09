import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandindPageComponent } from './landind-page/landind-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { PharmacistPageComponent } from './pharmacist-page/pharmacist-page.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  {path:'',component:LandindPageComponent},
  {path:'register',component:RegisterPageComponent},
  {path:'admin',component:AdminPageComponent},
  {path:'pharmacist',component:PharmacistPageComponent},
  {path:'customer',component:CustomerPageComponent},
  {path:'products',component:ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
