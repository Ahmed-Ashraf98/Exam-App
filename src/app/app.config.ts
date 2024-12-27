import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  GoogleLoginProvider,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { apiInterceptor } from './features/interceptors/api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([apiInterceptor])),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '881142640444-lfca29ggj6o3d34h8gr2tvrd7ef5p1uc.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    importProvidersFrom(SocialLoginModule),
  ],
};

// import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
// import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
// {
//   provide: 'SocialAuthServiceConfig',
//   useValue: {
//     autoLogin: false,
//     lang: 'en',
//     providers: [
//       {
//         id: GoogleLoginProvider.PROVIDER_ID,
//         provider: new GoogleLoginProvider(
//           '881142640444-lfca29ggj6o3d34h8gr2tvrd7ef5p1uc.apps.googleusercontent.com'
//         ),
//       },
//     ],
//     onError: (err) => {
//       console.error(err);
//     },
//   } as SocialAuthServiceConfig,
// },
