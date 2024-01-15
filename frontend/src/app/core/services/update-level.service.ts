import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UpdateLevelService {
  private baseUrl = 'http://127.0.0.1:5000/api_quizzes/update_topic_levels';

  constructor(private http: HttpClient) {}

  submitNewLevel(username: string, topic: string, level: string): Observable<any> {
    const updateLevelUrl = `${this.baseUrl}/${topic}`;
    const payload = { username, level };

    return this.http.post(updateLevelUrl, payload);
  }
}
