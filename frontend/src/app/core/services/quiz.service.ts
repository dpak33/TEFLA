import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private quizUrl = 'http://127.0.0.1:5000/activities/quiz/questions';

  constructor(private http: HttpClient) {}

  getQuizQuestions(): Observable<any> {
    return this.http.get(this.quizUrl);
  }
}
