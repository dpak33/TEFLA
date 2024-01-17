import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { QuizComponent } from './quiz/quiz.component';
import { StudyroomComponent } from './studyroom/studyroom.component';
import { TravelBeginnerComponent } from './studyroom/travel-beginner/travel-beginner.component';
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
      // ... other sub-routes under studyroom
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
