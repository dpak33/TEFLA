import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private quizUrl = 'http://127.0.0.1:5000/activities/quiz'; // Base URL for quiz-related endpoints
  private completeQuizUrl = 'http://127.0.0.1:5000/auth/completeQuiz'; // URL for completing the quiz

  constructor(private http: HttpClient) {}

  getQuizQuestions(): Observable<any> {
    return this.http.get(this.quizUrl + '/questions');
  }

  submitQuizAnswers(answers: any): Observable<any> {
    const submitUrl = this.quizUrl + '/evaluate';
    return this.http.post(submitUrl, { answers });
  }

  completeQuiz(username: string): Observable<any> {
    return this.http.post(this.completeQuizUrl, { username });
  }
}
