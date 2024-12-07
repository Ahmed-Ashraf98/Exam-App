import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-section',
  standalone: true,
  imports: [],
  templateUrl: './custom-section.component.html',
  styleUrl: './custom-section.component.scss',
})
export class CustomSectionComponent {
  @Input() sectionWrapperClasses: string = '';
}
