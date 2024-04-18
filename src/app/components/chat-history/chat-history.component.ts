import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.css'


})
export class ChatHistoryComponent {
  @Input() history: { nickname: string, message: string, timestamp: Date }[] = [];
}
