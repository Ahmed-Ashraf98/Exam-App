import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [ButtonModule, LoadingComponent],
  templateUrl: './auth-button.component.html',
  styleUrl: './auth-button.component.scss',
})
export class AuthButtonComponent {
  @Input() btnLabel: string = '';
  @Input() isDisabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Output() actionToParent: EventEmitter<any> = new EventEmitter();

  runAction() {
    this.actionToParent.emit();
  }
}
