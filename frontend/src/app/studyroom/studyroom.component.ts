import { Component } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-studyroom',
  templateUrl: './studyroom.component.html',
  styleUrls: ['./studyroom.component.css']
})
export class StudyroomComponent {
  isTravelBeginnerActive: boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(
    //below typeguard for ensuring type-safety
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
    //Change bool to true if url is travel-beginner as below:
      this.isTravelBeginnerActive = event.urlAfterRedirects.includes('/travel-beginner');
    });
  }
}
