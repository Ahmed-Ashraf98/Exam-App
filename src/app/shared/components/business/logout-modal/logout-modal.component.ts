import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../ui/primary-button/primary-button.component';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [PrimaryButtonComponent],
  templateUrl: './logout-modal.component.html',
  styleUrl: './logout-modal.component.scss',
})
export class LogoutModalComponent {}
