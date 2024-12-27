import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sso-button',
  standalone: true,
  imports: [],
  templateUrl: './sso-button.component.html',
  styleUrl: './sso-button.component.scss',
})
export class SsoButtonComponent {
  @Input() imgUrl!: string;
  @Output() onClick = new EventEmitter<string>();

  clickHandler() {
    this.onClick.emit();
  }
}
