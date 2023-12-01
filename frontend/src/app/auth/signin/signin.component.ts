import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SignInResponse } from '../auth.interfaces';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../auth.component.css']
})
export class SigninComponent {

  username!: string;
  password!: string;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  onSignin(formData: any) {


    console.log('Form Data:', JSON.stringify(formData, null, 2));

    this.authService.signin(formData).subscribe({
      next: (response: SignInResponse) => {
        console.log('Signin successful', response);
  //Storing user in state via user service sub-folder of core for later extraction
        this.userService.setCurrentUsername(response.username)
        if (response.firstTimeSignIn === true || response.completedQuiz === false) {
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
