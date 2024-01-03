import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getQuizQuestions(level: string, topic: string): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/api/generate_quiz`, { user_level: level, topic: topic });
}

  //evaluateQuizAnswers(answers: any): Observable<any> {
    // Replace with your actual Flask route for evaluating answers
    //return this.http.post<any>(`${this.baseUrl}/evaluate-quiz`, answers);
  //}
}
