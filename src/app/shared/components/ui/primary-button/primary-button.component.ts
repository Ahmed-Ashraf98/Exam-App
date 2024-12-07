import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [ButtonModule, LoadingComponent],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss',
})
export class PrimaryButtonComponent {
  @Input() btnLabel: string = '';
  @Input() classes: string = '';
  @Input() styles: string = '';
  @Input() isDisabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Output() actionToParent: EventEmitter<any> = new EventEmitter();

  runAction() {
    this.actionToParent.emit();
  }
}
