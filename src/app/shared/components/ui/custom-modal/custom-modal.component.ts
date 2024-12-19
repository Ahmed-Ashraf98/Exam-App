import { Component, Input } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';

@Component({
  selector: 'app-custom-modal',
  standalone: true,
  imports: [PrimaryButtonComponent],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.scss',
})
export class CustomModalComponent {
  @Input() modalWidth?: number;
  @Input() modalMinWidth?: number;
}
