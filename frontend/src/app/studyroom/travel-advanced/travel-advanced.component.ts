import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travel-advanced',
  templateUrl: './travel-advanced.component.html',
  styleUrls: ['../studyroom.component.css']
})

export class TravelAdvancedComponent {
  currentPage = 1;


  constructor(private router: Router) {}
  startTravelAdvancedQuiz() {
  this.router.navigate(['/section-quizzes', 'advanced', 'travel']);
  }

  //Change page
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
