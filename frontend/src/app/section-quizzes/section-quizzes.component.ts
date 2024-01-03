import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatGptService } from '../core/services/chat-gpt.service';

@Component({
  selector: 'app-section-quizzes',
  templateUrl: './section-quizzes.component.html',
  styleUrls: ['./section-quizzes.component.css']
})
export class SectionQuizzesComponent implements OnInit {
  quizQuestions: any[] = []; // To store questions from ChatGPT
  userAnswers: any = {}; // To store user's answers
  level: string = ''; // User's level
  topic: string = ''; // Topic of the quiz

  constructor(private chatGptService: ChatGptService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.level = params['level'];
      this.topic = params['topic'];
      this.loadQuiz(this.level, this.topic);
    });
  }

  loadQuiz(level: string, topic: string) {
    this.chatGptService.getQuizQuestions(level, topic).subscribe(
      questions => this.quizQuestions = questions,
      error => console.error('Error loading quiz questions:', error)
    );
  }

  // Uncomment and complete this method when you're ready to implement it
  /*onSubmit() {
    this.chatGptService.evaluateQuizAnswers(this.userAnswers).subscribe(
      result => {
        // Handle the result
      },
      error => console.error('Error submitting quiz answers:', error)
    );
  }*/
}
