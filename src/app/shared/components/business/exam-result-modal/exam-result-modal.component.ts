import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-exam-result-modal',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './exam-result-modal.component.html',
  styleUrl: './exam-result-modal.component.scss',
})
export class ExamResultModalComponent implements OnInit {
  @Input() correctAnswersCount: number = 0;
  @Input() wrongAnswersCount: number = 0;

  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      this.data = {
        datasets: [
          {
            data: [this.correctAnswersCount, this.wrongAnswersCount],
            backgroundColor: ['#02369C', '#CC1010'],
            hoverBackgroundColor: ['#02229C', '#CC2229'],
          },
        ],
      };

      this.options = {
        cutout: '85%',
        responsive: true,
        maintainAspectRatio: false,
      };
    }
  }

  ngOnInit(): void {
    this.initChart();
  }
}
