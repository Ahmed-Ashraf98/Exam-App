import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PrimaryButtonComponent } from '../../ui/primary-button/primary-button.component';
@Component({
  selector: 'app-questions-modal',
  standalone: true,
  imports: [ReactiveFormsModule, RadioButtonModule, PrimaryButtonComponent],
  templateUrl: './questions-modal.component.html',
  styleUrl: './questions-modal.component.scss',
})
export class QuestionsModalComponent implements OnInit {
  formGroup!: FormGroup;
  categories: any[] = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' },
  ];
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      selectedCategory: new FormControl(),
    });
  }
}
