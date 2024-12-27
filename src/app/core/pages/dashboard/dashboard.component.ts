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
import { SkeletonModule } from 'primeng/skeleton';
import { ScrollerModule } from 'primeng/scroller';
import { VirtualScrollerModule } from 'primeng/virtualscroller'; // Import VirtualScrollerModule

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ReportCardComponent,
    CustomProgressBarComponent,
    CustomSectionComponent,
    SubjectCardComponent,
    ScrollingModule,
    ScrollerModule,
    SkeletonModule,
    VirtualScrollerModule,
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
  items!: string[];
  isUserInfoLoaded = false;
  isSubjectsDataLoaded = false;

  getUserInfo() {
    this._AuthApiManagerService.profileData(baseUrl).subscribe({
      next: (res) => {
        this.userObj = res.user;
        this.isUserInfoLoaded = true;
      },
    });
  }

  getAllSubjects(page?: number, limit?: number) {
    this._SubjectsAPIService.getAllSubjects(page, limit).subscribe({
      next: (res) => {
        this.allSubjects = [...this.allSubjects, ...res.subjects];
        this.isSubjectsDataLoaded = true;
      },
    });
  }

  loadItems(event: any) {
    console.log('Loading more items', event);

    this.getAllSubjects(event.first + 1, event.last);
  }

  goToExamsOfSubject(subjectId: string) {
    this._Router.navigate(['main/exams'], {
      queryParams: { subject: subjectId },
    });
  }

  onScroll(index: number) {
    console.log('Scrolled to index:', index);
    if (index + 1 === this.allSubjects.length) {
      this.getAllSubjects(index, 3);
    }
  }

  ngOnInit(): void {
    this.getUserInfo();
    this.getAllSubjects(1, 3);
    this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
  }
}
