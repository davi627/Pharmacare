import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  role: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  // Handle login on form submit
  onSubmit() {
    if (this.email && this.password && this.role) {
      const userData = {
        email: this.email,
        password: this.password,
        role: this.role
      };

      this.authService.login(userData).subscribe(
        (response: any) => {
          // Check if the role matches the one returned from the backend
          if (response.role === this.role) {
            // Navigate to the corresponding role dashboard
            if (this.role === 'Admin') {
              this.router.navigateByUrl('/admin');
            } else if (this.role === 'Customer') {
              this.router.navigateByUrl('/customer');
            } else if (this.role === 'Pharmacist') {
              this.router.navigateByUrl('/pharmacist');
            }
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Role does not match the email!';
          }
        },
        (error) => {
          this.errorMessage = 'Invalid credentials or server error!';
        }
      );
    } else {
      this.errorMessage = 'Please fill all fields!';
    }
  }

  navigateToRegister(){
    this.router.navigateByUrl('/register');
  }

}
