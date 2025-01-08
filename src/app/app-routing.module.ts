import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandindPageComponent } from './landind-page/landind-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';


const routes: Routes = [
  {path:'',component:LandindPageComponent},
  {path:'register',component:RegisterPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
