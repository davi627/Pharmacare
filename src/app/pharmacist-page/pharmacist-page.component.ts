import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pharmacist-page',
  templateUrl: './pharmacist-page.component.html',
  styleUrls: ['./pharmacist-page.component.css']
})
export class PharmacistPageComponent {
  constructor(private router:Router){}

  navigateToProduct(){
    this.router.navigateByUrl('/products');
  }

}
