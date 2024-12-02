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
  // inject services
  private readonly _Router = inject(Router);
  /**
   * @summary Return back to the main page
   */
  backToMainPage() {
    this._Router.navigate(['auth/signin']);
  }
}
