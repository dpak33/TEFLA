import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInResponse } from './auth.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:5000/auth';

  constructor(private http: HttpClient) { }

  register(userData: any) {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  signin(userData: any): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.baseUrl}/signin`, userData);
  }
}
