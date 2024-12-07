import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subject-card',
  standalone: true,
  imports: [],
  templateUrl: './subject-card.component.html',
  styleUrl: './subject-card.component.scss',
})
export class SubjectCardComponent {
  @Input() imageUrl: string = '';
  @Input() subjectName: string = '';
  @Input() subjectDescription: string =
    'Voluptatem aut ut dignissimos blanditiis';
}
