import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
@Component({
  selector: 'app-input-validation-alert',
  standalone: true,
  imports: [MessagesModule],
  templateUrl: './input-validation-alert.component.html',
  styleUrl: './input-validation-alert.component.scss',
})
export class InputValidationAlertComponent {
  @Input() form!: FormGroup;
  @Input() inputName!: string;

  get requiredErrorMessage(): string {
    return `The ${this.inputName} is required`;
  }

  get emailErrorMessage(): string {
    return `The email pattern is not correct`;
  }

  get patternErrorMessage(): string {
    return `The ${this.inputName} pattern is not correct`;
  }
}
