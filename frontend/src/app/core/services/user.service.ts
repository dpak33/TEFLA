import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUsername: string | null = null;

  setCurrentUsername(username: string) {
    this.currentUsername = username;
  }

  getCurrentUsername(): string | null {
    return this.currentUsername;
  }
}
