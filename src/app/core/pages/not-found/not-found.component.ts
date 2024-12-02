import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from '../../../shared/components/ui/primary-button/primary-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [PrimaryButtonComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  private readonly _Router = inject(Router);
  backToMainPage() {
    this._Router.navigate(['auth/signin']);
  }
}
