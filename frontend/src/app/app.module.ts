import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './auth/signin/signin.component';
import { RegisterComponent } from './auth/register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { StudyroomComponent } from './studyroom/studyroom.component';
import { TravelBeginnerComponent } from './studyroom/travel-beginner/travel-beginner.component';
import { SectionQuizzesComponent } from './section-quizzes/section-quizzes.component';
import { TravelBeginnerQuizComponent } from './section-quizzes/travel-beginner-quiz/travel-beginner-quiz.component';
import { UpdateTopicLevelComponent } from './section-quizzes/update-topic-level/update-topic-level.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    SigninComponent,
    RegisterComponent,
    QuizComponent,
    StudyroomComponent,
    TravelBeginnerComponent,
    SectionQuizzesComponent,
    TravelBeginnerQuizComponent,
    UpdateTopicLevelComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
