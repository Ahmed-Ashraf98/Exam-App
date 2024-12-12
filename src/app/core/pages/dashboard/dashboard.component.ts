import { Component, inject, OnInit } from '@angular/core';
import { ReportCardComponent } from '../../../shared/components/ui/report-card/report-card.component';
import { CustomProgressBarComponent } from '../../../shared/components/ui/custom-progress-bar/custom-progress-bar.component';
import { CustomSectionComponent } from '../../../shared/components/ui/custom-section/custom-section.component';
import { SubjectCardComponent } from '../../../shared/components/ui/subject-card/subject-card.component';
import { AuthApiManagerService } from 'auth-api-manager';
import { baseUrl } from '../../environment/environment.prod';
import { SubjectsAPIService } from '../../../features/services/subjects-api.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ReportCardComponent,
    CustomProgressBarComponent,
    CustomSectionComponent,
    SubjectCardComponent,
    ScrollingModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  // inject services
  private readonly _AuthApiManagerService = inject(AuthApiManagerService);
  private readonly _SubjectsAPIService = inject(SubjectsAPIService);
  private readonly _Router = inject(Router);

  // Declare Vars
  userObj: any;
  allSubjects: any = [];
  items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);
  getUserInfo() {
    this._AuthApiManagerService.profileData(baseUrl).subscribe({
      next: (res) => {
        console.log('Hellloz', res);
        this.userObj = res.user;
      },
    });
  }

  getAllSubjects(page?: number, limit?: number) {
    this._SubjectsAPIService.getAllSubjects(page, limit).subscribe({
      next: (res) => {
        this.allSubjects = this.allSubjects.concat(res.subjects);
      },
    });
  }

  goToExamsOfSubject(subjectId: string) {
    this._Router.navigate(['', subjectId]);
  }

  onScroll(index: number) {
    console.log('Scrolling ....', index);
  }

  ngOnInit(): void {
    this.getUserInfo();
    this.getAllSubjects(1, 3);
  }
}
