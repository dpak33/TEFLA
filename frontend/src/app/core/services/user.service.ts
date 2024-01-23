import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUsername: string | null = null;
  private currentLevel: string | null = null;
  private currentTopic: string | null = null;

  setCurrentUsername(username: string) {
    this.currentUsername = username;
  }

  getCurrentUsername(): string | null {
    return this.currentUsername;
  }

  setCurrentTopic(topic: string | null) {
    this.currentTopic = topic;
  }

  getCurrentTopic(): string | null {
    return this.currentTopic;
  }

  setCurrentLevel(level: string | null) {
    this.currentLevel = level;
  }

  getCurrentLevel(): string | null {
    return this.currentLevel;
  }
}
