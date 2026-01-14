// auth/domain/gateways/auth.gateway.ts
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {LoginResponse} from '../../compte/models/loginResponse.model';


export abstract class AuthGateway {
  //abstract login(clientCode: string, password: string): Observable<any>;
  abstract register(clientCode: string, password: string): Observable<LoginResponse>;
}
