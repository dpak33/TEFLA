import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-intermediate',
  templateUrl: './work-intermediate.component.html',
  styleUrls: ['../studyroom.component.css']
})
export class WorkIntermediateComponent {
  currentPage = 1;


  constructor(private router: Router) {}
  startWorkAdvancedQuiz() {
  this.router.navigate(['/section-quizzes', 'intermediate', 'work']);
  }

  //Change page
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
