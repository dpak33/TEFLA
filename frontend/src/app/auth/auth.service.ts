import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInResponse } from './auth.interfaces';
import { Observable } from 'rxjs';
import { UserService } from '../core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:5000/auth';

  constructor(private http: HttpClient, private userService: UserService) { } // Inject UserService here

  register(userData: any) {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  signin(userData: any): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.baseUrl}/signin`, userData);
  }

  completeQuiz(): Observable<any> {
    const username = this.userService.getCurrentUsername(); // Use UserService to get the username
    if (!username) {
      throw new Error('No username found'); // Or handle this case appropriately
    }

    return this.http.post(`${this.baseUrl}/completeQuiz`, { username });
  }
}
