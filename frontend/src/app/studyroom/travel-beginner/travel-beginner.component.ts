import { Component } from '@angular/core';

@Component({
  selector: 'app-travel-beginner',
  templateUrl: './travel-beginner.component.html',
  styleUrls: ['./travel-beginner.component.css']
})
export class TravelBeginnerComponent {
  currentPage = 1;

  // Function to change page
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
