import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-beginner',
  templateUrl: './work-beginner.component.html',
  styleUrls: ['../studyroom.component.css']
})
export class WorkBeginnerComponent {
  currentPage = 1;


  constructor(private router: Router) {}
  startWorkBeginnerQuiz() {
  this.router.navigate(['/section-quizzes', 'beginner', 'work']);
  }

  //Change page
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
