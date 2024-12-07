import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main-menu-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-menu-item.component.html',
  styleUrl: './main-menu-item.component.scss',
})
export class MainMenuItemComponent {
  @Input() itemRouter: string | null = null;
  @Input() itemName: string = '';
  @Input() itemIcon: string = '';
  @Input() classes: string = '';
}
