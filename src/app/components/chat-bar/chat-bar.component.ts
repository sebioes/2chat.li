import { NgIf } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChatService } from '../shared/services/chat.service';
import { ChatMessage } from '../shared/models/chat-message';
import { EMPTY, catchError, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-chat-bar',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './chat-bar.component.html',
  styleUrl: './chat-bar.component.css',
})
export class ChatBarComponent {
  @Input() public nickname = '';
  @Output() public messageToSend = new EventEmitter<string>();

  public chatMessage = '';
  public errorMessage!: string;
  public saving = false;

  private destroyRef = inject(DestroyRef);

  constructor(private chatService: ChatService) {}

  public addMessage(message: string): void {
    message = message.replace(/(\r\n|\r|\n)/, '');
    message = message.trim();

    if (!message) {
      this.errorMessage = 'Please add a message!';

      return;
    }

    if (!this.nickname) {
      this.errorMessage = 'Please add a nickname!';
      this.chatMessage = '';

      return;
    }

    const messageToSend: ChatMessage = {
      message: message,
      nickname: this.nickname,
    };

    this.saving = true;
    this.chatService
      .addToHistory(messageToSend)
      .pipe(
        tap(() => {
          this.chatMessage = '';
          this.errorMessage = '';
        }),
        finalize(() => (this.saving = false)),
        takeUntilDestroyed(this.destroyRef),
        catchError((error: Error) => {
          this.errorMessage = error.message;
          // log to log-server
          console.error(error);

          return EMPTY;
        })
      )
      .subscribe();
  }

  public addEmoji(emoji: string): void {
    this.chatMessage += emoji;
  }
}