import { Component } from '@angular/core';

@Component({
  selector: 'app-section-quizzes',
  templateUrl: './section-quizzes.component.html',
  styleUrls: ['./section-quizzes.component.css']
})
export class SectionQuizzesComponent implements OnInit {
  quizQuestions: any[]; // To store questions from ChatGPT
  userAnswers: any = {}; // To store user's answers
  level: string; // User's level
  topic: string; // Topic of the quiz

  constructor(private chatGptService: ChatGptService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.level = params['level'];
      this.topic = params['topic'];
      this.loadQuiz(this.level, this.topic);
    });
  }

  loadQuiz(level: string, topic: string) {
    // Call to ChatGPT API to get questions
    this.chatGptService.getQuizQuestions(level, topic).subscribe(
      questions => this.quizQuestions = questions,
      error => console.error(error)
    );
  }

  onSubmit() {
    // Submit answers to ChatGPT for evaluation
    this.chatGptService.evaluateQuizAnswers(this.userAnswers).subscribe(
      result => {
        // Handle the result
      },
      error => console.error(error)
    );
  }
}
