import { Component } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-studyroom',
  templateUrl: './studyroom.component.html',
  styleUrls: ['./studyroom.component.css']
})
export class StudyroomComponent {
  isTravelBeginnerActive = false;
  isTravelIntermediateActive = false;
  isBackToStudyRoomActive = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      // Below typeguard for ensuring type-safety
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Change bool to true if url is travel-beginner or travel-intermediate
      this.isTravelBeginnerActive = event.urlAfterRedirects.includes('/travel-beginner');
      this.isTravelIntermediateActive = event.urlAfterRedirects.includes('/travel-intermediate');

      // Update isBackToStudyRoomActive based on either of the travel options
      this.isBackToStudyRoomActive = this.isTravelBeginnerActive || this.isTravelIntermediateActive;
    });
  }
}
