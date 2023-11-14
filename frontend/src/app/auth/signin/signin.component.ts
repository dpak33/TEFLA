import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../auth.component.css']
})
export class SigninComponent {

  username!: string;
  password!: string;

  constructor(private authService: AuthService) { }

  onSignin(formData: any) {


    console.log('Form Data:', JSON.stringify(formData, null, 2));

    this.authService.signin(formData).subscribe({
      next: (response) => {
        console.log('Signin successful', response);
        // Redirect or handle response here
      },
      error: (error) => {
        console.error('Signin failed', error);
        // Handle error here
      }
    });
  }
}
