import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sso-button',
  standalone: true,
  imports: [],
  templateUrl: './sso-button.component.html',
  styleUrl: './sso-button.component.scss',
})
export class SsoButtonComponent {
  @Input() imgUrl!: string;
}
