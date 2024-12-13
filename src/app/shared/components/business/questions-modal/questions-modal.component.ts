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
    { name: 'Numquam ipsum et nostrum non iste porro laudantium.', key: 'A' },
    { name: 'Corrupti porro et hic voluptas odio.', key: 'M' },
    { name: 'Voluptate itaque sunt ut soluta est sunt illum.', key: 'P' },
    { name: 'Voluptas necessitatibus et ut sit suscipit a.', key: 'R' },
  ];
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      selectedCategory: new FormControl(),
    });
  }
}
