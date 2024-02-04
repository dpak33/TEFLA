import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-greetings-advanced',
  templateUrl: './greetings-advanced.component.html',
  styleUrls: ['./greetings-advanced.component.css']
})

export class GreetingsAdvancedComponent {
  constructor(private router: Router) {}
}
