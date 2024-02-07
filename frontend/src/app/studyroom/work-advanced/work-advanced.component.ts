import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-advanced',
  templateUrl: './work-advanced.component.html',
  styleUrls: ['../studyroom.component.css']
})
export class WorkAdvancedComponent {
  currentPage = 1;


  constructor(private router: Router) {}
  startWorkAdvancedQuiz() {
  this.router.navigate(['/section-quizzes', 'advanced', 'work']);
  }

  //Change page
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
