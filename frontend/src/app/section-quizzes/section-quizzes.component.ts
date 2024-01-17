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
  // Make API call to chatGPT, get the score (dummy logic for now)
  const dummyScore = 80;

// Logic to handle the score (e.g., updating user level based on topic score and existing level)
//So will assign user level based on extraction logic for score following second call to chat. Then will update user
//level in relevant route AFTER navigating to the sub-route.

  // Navigate to the sub-level with the updated score
  this.router.navigate(['update-topic-level'], {
    queryParams: { updatedLevel: 'B1', topic: 'travel' },
  });
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
