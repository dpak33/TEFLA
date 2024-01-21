import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatGptService } from '../core/services/chat-gpt.service';
import { Router } from '@angular/router';

export interface QuizQuestion {
  type: 'multiple-choice' | 'open-ended';
  question: string;
  options?: string[];
}

@Component({
  selector: 'app-section-quizzes',
  templateUrl: './section-quizzes.component.html',
  styleUrls: ['./section-quizzes.component.css']
})
export class SectionQuizzesComponent implements OnInit {
  quizQuestions: QuizQuestion[] = [];
  userAnswers: any = {}; // To store user's answers
  level: string = 'beginner'; // User's level
  topic: string = 'travel'; // Topic of the quiz

  constructor(private chatGptService: ChatGptService, private route: ActivatedRoute, private router: Router) {}

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

  completeQuiz() {


  // Combine original questions and user answers into a single object
  const testData = {
    quizQuestions: this.quizQuestions,
    userAnswers: this.userAnswers
  };

  // Make API call to the evaluateQuizAnswers route
  this.chatGptService.evaluateQuizAnswers(testData).subscribe(
    result => {
      // Handle the result from the evaluateQuizAnswers route
      console.log('Quiz evaluation result:', result);

      // Dummy logic to navigate to the update-topic-level route
      this.router.navigate(['update-topic-level'], {
        queryParams: { updatedLevel: 'B1', topic: 'travel' },
      });
    },
    error => console.error('Error evaluating quiz answers:', error)
  );
}

onMultipleChoiceChange(questionIndex: number, optionIndex: number) {
  this.userAnswers[`question_${questionIndex + 1}`] = optionIndex;
  console.log('User Answers:', this.userAnswers);
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
