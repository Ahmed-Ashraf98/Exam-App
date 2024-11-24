import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './auth-button.component.html',
  styleUrl: './auth-button.component.scss',
})
export class AuthButtonComponent {
  @Input() btnLabel!: string;
  @Input() isDisabled!: boolean;
  @Output() actionToParent: EventEmitter<any> = new EventEmitter();

  runAction() {
    this.actionToParent.emit();
  }
}
