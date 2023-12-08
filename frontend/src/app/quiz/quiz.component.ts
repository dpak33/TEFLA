import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuizService } from '../core/services/quiz.service';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router'; // Import Router if navigation is needed

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
        // Here you can handle the quiz results, like showing the user's level
        // You can also navigate to another route if needed
        // this.router.navigate(['/studyroom']); // Example navigation

        // Optionally, call the completeQuiz route to update the user's status
        this.completeUserQuiz();
      },
      error: (error) => {
        console.error('Error submitting quiz:', error);
        // Handle submission error appropriately
      }
    });
  }

  completeUserQuiz() {
    // Assuming you have a method to get the current username
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

