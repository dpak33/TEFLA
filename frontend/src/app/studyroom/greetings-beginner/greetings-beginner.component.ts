import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-greetings-beginner',
  templateUrl: './greetings-beginner.component.html',
  styleUrls: ['./greetings-beginner.component.css']
})

export class GreetingsBeginnerComponent {
  constructor(private router: Router) {}
}
