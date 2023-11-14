import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.css']
})
export class RegisterComponent {

  name!: string;
  username!: string;
  email!: string;
  password!: string;

  constructor(private authService: AuthService) { }

  onRegister(formData: any) {
    console.log('Form Data: ' + JSON.stringify(formData, null, 2));
    console.log('Name: ', formData.name);

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
