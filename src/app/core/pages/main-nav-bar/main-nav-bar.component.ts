import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../../shared/components/ui/primary-button/primary-button.component';
import { SkeletonModule } from 'primeng/skeleton';
@Component({
  selector: 'app-main-nav-bar',
  standalone: true,
  imports: [PrimaryButtonComponent, SkeletonModule],
  templateUrl: './main-nav-bar.component.html',
  styleUrl: './main-nav-bar.component.scss',
})
export class MainNavBarComponent {
  isImageLoaded = false;
  onImageLoad() {
    this.isImageLoaded = true;
  }
}
