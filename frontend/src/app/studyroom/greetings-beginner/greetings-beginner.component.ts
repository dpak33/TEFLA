import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-greetings-beginner',
  templateUrl: './greetings-beginner.component.html',
  styleUrls: ['../studyroom.component.css']
})
export class GreetingsBeginnerComponent {
  currentPage = 1;


  constructor(private router: Router) {}
  startGreetingsBeginnerQuiz() {
  this.router.navigate(['/section-quizzes', 'beginner', 'greetings']);
  }

  //Change page
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
