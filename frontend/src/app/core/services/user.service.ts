import { Injectable } from '@angular/core';

export interface UserState {
  isFirstSignIn: boolean;
  hasCompletedQuiz: boolean;
  currentUsername: string;  // Add username to the interface
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private userState: UserState = {
    isFirstSignIn: true,
    hasCompletedQuiz: false,
    currentUsername: ''  // Initialize username as an empty string
  };

  setUserState(state: UserState) {
    this.userState = state;
  }

  getUserState(): UserState {
    return this.userState;
  }

  setCurrentUsername(username: string) {
    this.userState.username = username;
  }

  getCurrentUsername(): string {
    return this.userState.username;
  }
}
