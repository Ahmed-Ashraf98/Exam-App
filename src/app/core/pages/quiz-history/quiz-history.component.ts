import { Component, inject, OnInit } from '@angular/core';
import { QuestionsAPIService } from '../../../features/services/questions-api.service';

@Component({
  selector: 'app-quiz-history',
  standalone: true,
  imports: [],
  templateUrl: './quiz-history.component.html',
  styleUrl: './quiz-history.component.scss',
})
export class QuizHistoryComponent implements OnInit {
  // inject services
  private readonly _QuestionsAPIService = inject(QuestionsAPIService);

  quizHistoryList = [];

  getQuizHistory() {
    this._QuestionsAPIService.getUserHistory().subscribe({
      next: (res) => {
        console.log(res);
        res.history && this.quizHistoryList.concat(res.history);
      },
    });
  }

  ngOnInit(): void {
    this.getQuizHistory();
  }
}
