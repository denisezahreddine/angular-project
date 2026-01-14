import {Injectable, signal} from '@angular/core';
import {User} from '../models/user.models';

@Injectable({providedIn: 'root'})
export class AuthStore {


  private readonly _isAuthenticated = signal<boolean>(!!localStorage.getItem('access_token'));
  private readonly _error = signal<string | null>(null);

  // signaux pour le profil
  private readonly _userName = signal<string>('');
  private readonly _clientCode = signal<string>('');

  // --- ÉTAT PUBLIC ---
  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly error = this._error.asReadonly();
  readonly userName = this._userName.asReadonly();
  readonly clientCode = this._clientCode.asReadonly();

  private _loading = signal<boolean>(false)
  readonly loading = this._loading.asReadonly();

  setLoading(loading: boolean) {
    this._loading.set(loading);
  }

  setLoginSuccess() {
    this._isAuthenticated.set(true);
    this._error.set(null);
  }


  setUserInfo(name: string, code: string) {
    this._userName.set(name);
    this._clientCode.set(code);
  }

  setLogout() {
    localStorage.removeItem('access_token');
    this._isAuthenticated.set(false);
    this._error.set(null);
    this._userName.set('');
    this._clientCode.set('');
  }

  setError(message: string) {
    this._error.set(message);
  }

}
