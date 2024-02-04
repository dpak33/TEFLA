import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { QuizComponent } from './quiz/quiz.component';
import { StudyroomComponent } from './studyroom/studyroom.component';
import { TravelBeginnerComponent } from './studyroom/travel-beginner/travel-beginner.component';
import { TravelIntermediateComponent } from './studyroom/travel-intermediate/travel-intermediate.component';
import { TravelAdvancedComponent } from './studyroom/travel-advanced/travel-advanced.component';
import { WorkBeginnerComponent } from './studyroom/work-beginner/work-beginner.component';
import { WorkIntermediateComponent } from './studyroom/work-intermediate/work-intermediate.component';
import { WorkAdvancedComponent } from './studyroom/work-advanced/work-advanced.component';
import { GreetingsBeginnerComponent } from './studyroom/greetings-beginner/greetings-beginner.component';
import { GreetingsIntermediateComponent } from './studyroom/greetings-intermediate/greetings-intermediate.component';
import { GreetingsAdvancedComponent } from './studyroom/greetings-advanced/greetings-advanced.component';
import {SectionQuizzesComponent } from './section-quizzes/section-quizzes.component';
import { UpdateTopicLevelComponent } from './update-topic-level/update-topic-level.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'activities/quiz/questions', component: QuizComponent },
  { path: 'section-quizzes/:level/:topic', component: SectionQuizzesComponent },
  { path: 'update-topic-level', component: UpdateTopicLevelComponent },
  { path: 'studyroom', component: StudyroomComponent,
   children: [
      { path: 'travel-beginner', component: TravelBeginnerComponent },
      { path: 'travel-intermediate', component: TravelIntermediateComponent },
      {path: 'travel-advanced', component: TravelAdvancedComponent },
      {path: 'work-beginner', component: WorkBeginnerComponent },
      {path: 'work-intermediate', component: WorkIntermediateComponent },
      {path: 'work-advanced', component: WorkAdvancedComponent },
      {path: 'greetings-beginner', component: GreetingsBeginnerComponent },
      {path: 'greetings-intermediate', component: GreetingsIntermediateComponent },
      {path: 'greetings-advanced', component: GreetingsAdvancedComponent },
      // ... other sub-routes you may want to add later.
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
