import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  constructor(private authService: AuthService) {}

  onCompleteQuiz() {
    // Send the quiz completion request
    this.authService.completeQuiz().subscribe({
      next: (response) => {
        // Handle the response, such as navigating to the study room
      },
      error: (error) => {
        // Handle any errors
      }
    });
  }
}
