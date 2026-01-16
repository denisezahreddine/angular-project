import {ApplicationConfig, InjectionToken, provideBrowserGlobalErrorListeners} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './core/auth.interceptor';
import {AuthGatewayImpl} from './gateway/auth-gateway-impl';
import {AuthGateway} from './gateway/auth-gateway';
import {TransactionGateway} from './gateway/transaction-gateway';
import {TransactionGatewayImpl} from './gateway/transaction-gateway-impl';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Configuration pour autoriser les appels HTTP et activer ton intercepteur
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    {provide: AuthGateway, useClass: AuthGatewayImpl},
    {provide: TransactionGateway, useClass: TransactionGatewayImpl},
  ]
};
