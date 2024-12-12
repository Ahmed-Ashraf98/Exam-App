import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-subject-card',
  standalone: true,
  imports: [],
  templateUrl: './subject-card.component.html',
  styleUrl: './subject-card.component.scss',
})
export class SubjectCardComponent {
  @Input() id: string = '';
  @Input() icon: string = '';
  @Input() name: string = '';
  @Input() description: string = 'Voluptatem aut ut dignissimos blanditiis';
  @Output() actionToParent: EventEmitter<any> = new EventEmitter();

  runAction() {
    this.actionToParent.emit();
  }
}
