import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamsAPIService } from '../../../features/services/exams-api.service';
import { SubjectsAPIService } from '../../../features/services/subjects-api.service';
import { QuizCardComponent } from '../../../shared/components/ui/quiz-card/quiz-card.component';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [QuizCardComponent],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
})
export class ExamsComponent implements OnInit {
  private readonly _Route = inject(ActivatedRoute);
  private readonly _ExamsAPIService = inject(ExamsAPIService);
  private readonly _SubjectsAPIService = inject(SubjectsAPIService);

  q_subjectId: string | null = null; // q_ => query param
  subjectTitle: string = '';
  examsList: any = [];

  getExamsOfSubject(subjectId: string) {
    this._ExamsAPIService.getAllExamsOnSubject(subjectId).subscribe({
      next: (res) => {
        this.examsList = res.exams;
        console.log(this.examsList);
      },
    });
  }

  getAllExams() {
    this._ExamsAPIService.getAllExams().subscribe({
      next: (res) => {
        this.examsList = res.exams;
      },
    });
  }

  getSubjectDetails(subjectId: string) {
    this._SubjectsAPIService.getSubjectById(subjectId).subscribe({
      next: (res) => {
        this.subjectTitle = res.category.name;
        console.log(this.subjectTitle);
      },
    });
  }

  ngOnInit(): void {
    this._Route.queryParamMap.subscribe((params) => {
      this.q_subjectId = params.get('subject');
      if (this.q_subjectId) {
        console.log('Subject ID:', this.q_subjectId);
        this.getExamsOfSubject(this.q_subjectId!);
        this.getSubjectDetails(this.q_subjectId!);
      } else {
        this.getAllExams();
      }
    });
  }
}
