import {ApplicationConfig, InjectionToken, provideBrowserGlobalErrorListeners} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './core/auth.interceptor';
import {AuthGatewayImpl} from './registration/gateway/auth-gateway-impl';
import {AuthGateway} from './registration/gateway/auth-gateway';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Configuration pour autoriser les appels HTTP et activer ton intercepteur
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    {provide: AuthGateway, useClass: AuthGatewayImpl}
  ]
};
