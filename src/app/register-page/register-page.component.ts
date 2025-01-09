import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = 'Admin';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthenticationService) {}

  onSubmit() {
    // Validate that passwords match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Prepare user data
    const userData = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      role: this.role,
    };

    // Call the registration service
    this.authService.registerUser(userData).subscribe(
      (response) => {
        this.successMessage = response.message;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = error.error?.message || 'Server error';
        this.successMessage = '';
      }
    );
  }

}
