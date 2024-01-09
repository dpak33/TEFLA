import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getQuizQuestions(level: string, topic: string): Observable<any[]> {
    return this.http.post<any>(`${this.baseUrl}/api_quizzes/generate_quiz`, { user_level: level, topic: topic }).pipe(
      map(response => {
        // Assuming the response structure remains the same.
        const content = response.choices[0].message.content;
        // Split the content into individual questions
        const questions = content.split(/\n\d+\./).slice(1); // Regex splits on new line and question number
        return questions.map((q: string) => ({ text: q.trim() })); // Mapping to expected format
      })
    );
  }

  //evaluateQuizAnswers(answers: any): Observable<any> {
    // Replace with your actual Flask route for evaluating answers
    //return this.http.post<any>(`${this.baseUrl}/evaluate-quiz`, answers);
  //}
}
