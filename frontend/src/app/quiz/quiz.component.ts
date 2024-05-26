import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuizService } from '../core/services/quiz.service';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  answers: { [key: string]: any } = {};

  constructor(
    private quizService: QuizService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizService.getQuizQuestions().subscribe({
      next: (data: any[]) => {
        this.questions = data;
      },
      error: (error: any) => {
        console.error('Error fetching quiz questions:', error);
        // Handle the error appropriately
      }
    });
  }

  submitQuiz(quizForm: NgForm): void {
    // Extract answers from the form
    const answers = quizForm.value;

    // Ensure user is defined
    const user = this.userService.getCurrentUsername();

    if (user) {
      // Create a dynamic payload with user and answers
      const payload = { user: { username: user }, answers };

      // Log the payload for inspection
      console.log('Payload:', payload);

      // Send the request
      this.quizService.submitQuizAnswers(payload).subscribe({
        next: (response: any) => {
          console.log('Quiz evaluated:', response);
          this.completeUserQuiz();
          this.router.navigate(['/studyroom']);
        },
        error: (error: any) => {
          console.error('Error submitting quiz:', error);
          // Handle submission error appropriately
        }
      });
    } else {
      console.error('No user found');
    }
  }

  completeUserQuiz(): void {
    const user = this.userService.getCurrentUsername();
    if (user) {
      this.quizService.completeQuiz(user).subscribe({
        next: (response: any) => {
          console.log('Quiz completion status updated:', response);
          // Handle successful update of completion status
        },
        error: (error: any) => {
          console.error('Error updating quiz completion status:', error);
          // Handle error in updating status
        }
      });
    } else {
      console.error('No user found');
    }
  }
}
