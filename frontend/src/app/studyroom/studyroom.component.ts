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
  isTravelAdvancedActive = false;
  isWorkBeginnerActive = false;
  isWorkIntermediateActive = false;
  isWorkAdvancedActive = false;
  isGreetingsBeginnerActive = false;
  isGreetingsIntermediateActive = false;
  isGreetingsAdvancedActive = false;
  isBackToStudyRoomActive = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      // Below typeguard for ensuring type-safety
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Change bool to true if url is travel-beginner or travel-intermediate
      this.isTravelBeginnerActive = event.urlAfterRedirects.includes('/travel-beginner');
      this.isTravelIntermediateActive = event.urlAfterRedirects.includes('/travel-intermediate');
      this.isTravelAdvancedActive = event.urlAfterRedirects.includes('/travel-advanced');
      this.isWorkBeginnerActive = event.urlAfterRedirects.includes('/work-beginner');
      this.isWorkIntermediateActive = event.urlAfterRedirects.includes('/work-intermediate');
      this.isWorkAdvancedActive = event.urlAfterRedirects.includes('/work-advanced');
      this.isGreetingsBeginnerActive = event.urlAfterRedirects.includes('/greetings-beginner');
      this.isGreetingsIntermediateActive = event.urlAfterRedirects.includes('/greetings-intermediate');
      this.isGreetingsAdvancedActive = event.urlAfterRedirects.includes('/greetings-advanced');

      // Update isBackToStudyRoomActive based on any of the options
      this.isBackToStudyRoomActive =
        this.isTravelBeginnerActive ||
        this.isTravelIntermediateActive ||
        this.isTravelAdvancedActive ||
        this.isWorkBeginnerActive ||
        this.isWorkIntermediateActive ||
        this.isWorkAdvancedActive ||
        this.isGreetingsBeginnerActive ||
        this.isGreetingsIntermediateActive ||
        this.isGreetingsAdvancedActive;
    });
  }
}
