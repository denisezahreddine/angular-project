import {Injectable, signal} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  // On initialise avec la présence du token
  private readonly _isAuthenticated = signal<boolean>(!!localStorage.getItem('access_token'));
  private readonly _error = signal<string | null>(null);

  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly error = this._error.asReadonly();

  setLoginSuccess() {
    this._isAuthenticated.set(true);
    this._error.set(null);
  }

  setLogout() {
    this._isAuthenticated.set(false);
    this._error.set(null);
  }

  setError(message: string) {
    this._error.set(message);
  }
}
