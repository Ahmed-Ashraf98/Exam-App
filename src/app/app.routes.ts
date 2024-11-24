import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () =>
      import('./core/layout/auth-layout/auth-layout.component').then(
        (c) => c.AuthLayoutComponent
      ),

    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      {
        path: 'signin',
        loadComponent: () =>
          import('./core/pages/signin/signin.component').then(
            (c) => c.SigninComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/pages/signup/signup.component').then(
            (c) => c.SignupComponent
          ),
      },
      {
        path: 'forgotPassword',
        loadComponent: () =>
          import('./core/pages/forgot-password/forgot-password.component').then(
            (c) => c.ForgotPasswordComponent
          ),
      },
    ],
  },
];
