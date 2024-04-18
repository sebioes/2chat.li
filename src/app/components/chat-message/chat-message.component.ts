import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
  imports: [CommonModule]
})
export class ChatMessageComponent {
  @Input() nickname: string = '';
  @Input() message: string = '';

  isMultiLineMessage(): boolean {
    return this.message.includes('\n');
  }

  getFirstLine(): string {
    return this.message.split('\n')[0];
  }
}
