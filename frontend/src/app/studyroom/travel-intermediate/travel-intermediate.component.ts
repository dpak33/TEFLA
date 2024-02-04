import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travel-intermediate',
  templateUrl: './travel-intermediate.component.html',
  styleUrls: ['./travel-intermediate.component.css']
})
export class TravelIntermediateComponent {
  currentPage = 1;


  constructor(private router: Router) {}
  startTravelIntermediateQuiz() {
  this.router.navigate(['/section-quizzes', 'intermediate', 'travel']);
  }

  //Change page
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
