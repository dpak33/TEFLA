import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-greetings-intermediate',
  templateUrl: './greetings-intermediate.component.html',
  styleUrls: ['../studyroom.component.css']
})
export class GreetingsIntermediateComponent {
  currentPage = 1;


  constructor(private router: Router) {}
  startGreetingsIntermediateQuiz() {
  this.router.navigate(['/section-quizzes', 'intermediate', 'greetings']);
  }

  //Change page
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
