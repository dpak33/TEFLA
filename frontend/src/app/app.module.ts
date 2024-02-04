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
import { TravelIntermediateComponent } from './studyroom/travel-intermediate/travel-intermediate.component';
import { TravelAdvancedComponent } from './studyroom/travel-advanced/travel-advanced.component';
import { WorkBeginnerComponent } from './studyroom/work-beginner/work-beginner.component';
import { WorkIntermediateComponent } from './studyroom/work-intermediate/work-intermediate.component';
import { WorkAdvancedComponent } from './studyroom/work-advanced/work-advanced.component';
import { GreetingsBeginnerComponent } from './studyroom/greetings-beginner/greetings-beginner.component';
import { GreetingsIntermediateComponent } from './studyroom/greetings-intermediate/greetings-intermediate.component';
import { GreetingsAdvancedComponent } from './studyroom/greetings-advanced/greetings-advanced.component';
import { SectionQuizzesComponent } from './section-quizzes/section-quizzes.component';
import { UpdateTopicLevelComponent } from './update-topic-level/update-topic-level.component';

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
    TravelIntermediateComponent,
    TravelAdvancedComponent,
    WorkBeginnerComponent,
    WorkIntermediateComponent,
    WorkAdvancedComponent,
    GreetingsBeginnerComponent,
    GreetingsIntermediateComponent,
    GreetingsAdvancedComponent,
    SectionQuizzesComponent,
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
