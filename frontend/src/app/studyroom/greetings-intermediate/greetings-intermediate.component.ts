import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-greetings-intermediate',
  templateUrl: './greetings-intermediate.component.html',
  styleUrls: ['./greetings-intermediate.component.css']
})

export class GreetingsIntermediateComponent {
  constructor(private router: Router) {}
}
