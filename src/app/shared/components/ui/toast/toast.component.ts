import { Component, inject, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [ToastModule, ButtonModule, RippleModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  private readonly _messageService = inject(MessageService);

  /**
   * @summary this function run the toaster with passed values when it's invoked
   * @todo you need to add the toaster component tag inside the page that you want to display the toaster in
   * @param severity the severity of the message [success,info,...]
   * @param title  the title of the message
   * @param message the message content
   */
  showToaster(severity: string, title: string, message: string): void {
    this._messageService.add({
      severity: severity,
      summary: title,
      detail: message,
    });
  }
}
