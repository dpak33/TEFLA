import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SignInResponse } from '../auth.interfaces';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../auth.component.css']
})
export class SigninComponent {

  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

  onSignin(formData: any) {


    console.log('Form Data:', JSON.stringify(formData, null, 2));

    this.authService.signin(formData).subscribe({
      next: (response: SignInResponse) => {
        console.log('Signin successful', response);
        if (response.firstTimeSignIn === true) {
          this.router.navigate(['/quiz']);
        }
        else {
          this.router.navigate(['/studyroom']);
        }
      },
      error: (error) => {
        console.error('Signin failed', error);
        // Handle error here
      }
    });
  }
}
