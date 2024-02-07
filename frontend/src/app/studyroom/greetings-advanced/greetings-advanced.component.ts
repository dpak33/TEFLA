import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-greetings-advanced',
  templateUrl: './greetings-advanced.component.html',
  styleUrls: ['../studyroom.component.css']
})
export class GreetingsAdvancedComponent {
  currentPage = 1;


  constructor(private router: Router) {}
  startGreetingsAdvancedQuiz() {
  this.router.navigate(['/section-quizzes', 'advanced', 'greetings']);
  }

  //Change page
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
