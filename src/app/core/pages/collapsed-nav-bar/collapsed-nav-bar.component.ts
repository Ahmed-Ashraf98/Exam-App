import { Component, OnInit } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { MainMenuItemComponent } from '../../../shared/components/ui/main-menu-item/main-menu-item.component';
import { LogOutBtnComponent } from '../../../shared/components/business/log-out-btn/log-out-btn.component';
@Component({
  selector: 'app-collapsed-nav-bar',
  standalone: true,
  imports: [SkeletonModule, MainMenuItemComponent, LogOutBtnComponent],
  templateUrl: './collapsed-nav-bar.component.html',
  styleUrl: './collapsed-nav-bar.component.scss',
})
export class CollapsedNavBarComponent implements OnInit {
  isImageLoaded = false;
  showNavOptions = false;

  onImageLoad() {
    this.isImageLoaded = true;
  }

  toggleMenuOptions() {
    console.log(`Show Nav Options is : ${this.showNavOptions}`);
    this.showNavOptions = !this.showNavOptions;
  }

  ngOnInit(): void {
    this.showNavOptions = false;
    console.log(`Show Nav Options is : ${this.showNavOptions}`);
  }
}
