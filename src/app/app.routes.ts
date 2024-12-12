import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';
import { loggedInUserGuard } from './core/guard/logged-in-user.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () =>
      import('./core/layout/auth-layout/auth-layout.component').then(
        (c) => c.AuthLayoutComponent
      ),
    canActivate: [loggedInUserGuard],

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
        path: 'forgotPWD',
        loadComponent: () =>
          import(
            './core/layout/forgot-pass-layout/forgot-pass-layout.component'
          ).then((c) => c.ForgotPassLayoutComponent),
      },
    ],
  },

  {
    path: 'main',
    loadComponent: () =>
      import('./core/layout/main-layout/main-layout.component').then(
        (c) => c.MainLayoutComponent
      ),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./core/pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'exams',
        loadComponent: () =>
          import('./core/pages/exams/exams.component').then(
            (c) => c.ExamsComponent
          ),
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./core/pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
