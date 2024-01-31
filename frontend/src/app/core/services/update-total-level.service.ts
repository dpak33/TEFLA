import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UpdateTotalLevelService {
  private updateTotalLevelUrl = 'http://127.0.0.1:5000/api_quizzes/update_total_level';

  constructor(private http: HttpClient) {}

  submitNewTotalLevel(username: string, userLevel: string): Observable<any> {
    const payload = { username, userLevel };

    return this.http.post(this.updateTotalLevelUrl, payload);
  }
}
