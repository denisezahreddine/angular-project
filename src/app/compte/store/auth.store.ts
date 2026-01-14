import {Injectable, signal} from '@angular/core';
import {User} from '../models/user.models';

@Injectable({providedIn: 'root'})
export class AuthStore {
  // On initialise avec la présence du token
  private readonly _isAuthenticated = signal<boolean>(!!localStorage.getItem('access_token'));
  private readonly _error = signal<string | null>(null);

  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly error = this._error.asReadonly();

  private _loading = signal<boolean>(false)
  readonly loading = this._loading.asReadonly();


  setLoginSuccess() {
    this._isAuthenticated.set(true);
    this._error.set(null);
  }

  setLoading(loading: boolean) {
    this._loading.set(loading);
  }


  setLogout() {
    this._isAuthenticated.set(false);
    this._error.set(null);
  }

  setError(message: string) {
    this._error.set(message);
  }
}
