import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService) { }

  onRegister(formData: any) {
    this.authService.register(formData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        // Redirect or handle response here
      },
      error: (error) => {
        console.error('Registration failed', error);
        // Handle error here
      }
    });
  }
}
