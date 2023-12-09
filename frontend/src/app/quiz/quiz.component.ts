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

  constructor(private quizService: QuizService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.quizService.getQuizQuestions().subscribe({
      next: (data) => {
        this.questions = data;
      },
      error: (error) => {
        console.error('Error fetching quiz questions:', error);
        // Handle the error appropriately
      }
    });
  }

  submitQuiz(quizForm: NgForm) {
    const answers = quizForm.value;
    console.log('Submitting answers:', answers); // For debugging

    this.quizService.submitQuizAnswers(answers).subscribe({
      next: (response) => {
        console.log('Quiz evaluated:', response);

        this.completeUserQuiz();
        this.router.navigate(['/studyroom']);
      },
      error: (error) => {
        console.error('Error submitting quiz:', error);
        // Handle submission error appropriately
      }
    });
  }

  completeUserQuiz() {
    const username = this.userService.getCurrentUsername(); // Replace with actual method to get username
    if (username) {
      this.quizService.completeQuiz(username).subscribe({
        next: (response) => {
          console.log('Quiz completion status updated:', response);
          // Handle successful update of completion status
        },
        error: (error) => {
          console.error('Error updating quiz completion status:', error);
          // Handle error in updating status
        }
      });
    }
    else {
       console.error('No username found');
    }
  }
}

