import { AuthService } from '../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { QuizService } from '../core/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: any[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.quizService.getQuizQuestions().subscribe((data) => {
      this.questions = data;
    });
  }
}

