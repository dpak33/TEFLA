import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatGptService } from '../core/services/chat-gpt.service';
import { Router } from '@angular/router';
import {UserService} from '../core/services/user.service';
import {calculateNewLevel, levelMappings} from './section-quizzes.helper';

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
  //level: string = ''; // User's level
  //topic: string = ''; // Topic of the quiz


  constructor(private chatGptService: ChatGptService, private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      //this.level = params['level'];
      //this.topic = params['topic'];
//setting the level and topic for re-extraction when sending the answers with questions to chatAPI for evaluation
      this.userService.setCurrentTopic(params['topic']);
      this.userService.setCurrentLevel(params['level']);
      this.loadQuiz(this.userService.getCurrentLevel(), this.userService.getCurrentTopic());
    });
  }


  loadQuiz(level: string | null, topic: string | null) {
  if (level != null && topic != null) {
  this.chatGptService.getQuizQuestions(level, topic).subscribe(
    questions => this.quizQuestions = questions,
    error => console.error('Error loading quiz questions:', error)
  );
  }
};


  completeQuiz() {
  const unansweredQuestions = this.quizQuestions.filter((question, index) => {
    const userAnswer = this.userAnswers[`question_${index + 1}`];
    return question.type === 'multiple-choice' && userAnswer === undefined;
  });

  if (unansweredQuestions.length > 0) {
    // Notify the user about unanswered questions, you can customize this based on your UI/UX
    alert('Please answer all questions before completing the quiz.');
    return;
  }

  // Combine original questions and user answers into a single object
  const testData = {
    quizQuestions: this.quizQuestions,
    userAnswers: this.userAnswers,
    userLevel: this.userService.getCurrentLevel(),
    currentTopic: this.userService.getCurrentTopic(),
    //username: this.userService.getCurrentUsername()
  };

  // Make API call to the evaluateQuizAnswers route
  this.chatGptService.evaluateQuizAnswers(testData).subscribe(
    result => {
      // Handle the result from the evaluateQuizAnswers route
      console.log('Quiz evaluation result:', result);
      console.log('Quiz score:', result.quiz_score)
      // Will feed score into helper script, which we now know is working. Then pass new level from helper with current topic to update
      //user level. If string reads unchanged within user level, we will not update backend route. Else we will.
      let quiz_score = parseFloat(result.quiz_score);
      let newLevel: string = "";
      if (this.userService.getCurrentLevel() != null) {
          newLevel = calculateNewLevel(quiz_score, this.userService.getCurrentLevel()!, levelMappings);
      }

      this.router.navigate(['update-topic-level'], {
        queryParams: { updatedLevel: newLevel, topic: this.userService.getCurrentTopic() },
      });
    },
    error => console.error('Error evaluating quiz answers:', error)
  );
}

onMultipleChoiceChange(questionIndex: number, optionIndex: number) {
  const optionLetters = ['a', 'b', 'c', 'd', 'e'];
  this.userAnswers[`question_${questionIndex + 1}`] = optionLetters[optionIndex];
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
