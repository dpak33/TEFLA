import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface QuizQuestion {
  type: 'multiple-choice' | 'open-ended';
  question: string;
  options?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getQuizQuestions(level: string, topic: string): Observable<QuizQuestion[]> {
  return this.http.post<any>(`${this.baseUrl}/api_quizzes/generate_quiz`, { user_level: level, topic: topic }).pipe(
    map(response => {
      const content = response.choices[0].message.content;
      const questionBlocks = content.split(/\n\n/);
      const questions: QuizQuestion[] = [];

      for (const block of questionBlocks) {
        if (block.includes('a)')) {
          const lines = block.split('\n');
          const question = lines[0];
          const options = lines.slice(1).map((o:string) => o.trim());

          questions.push({ type: 'multiple-choice', question, options });
        } else if (block.trim().length > 0) {
          questions.push({ type: 'open-ended', question: block.trim() });
        }
      }

      return questions;
    })
  );
}

  evaluateQuizAnswers(testData: any): Observable<any> {
    // Replace with your actual Flask route for evaluating answers
    return this.http.post<any>(`${this.baseUrl}/api_quizzes/test_response`, testData);
  }
}
