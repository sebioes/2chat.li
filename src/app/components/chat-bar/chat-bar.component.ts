import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DestroyRef, inject } from '@angular/core';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChatService } from '../shared/services/chat.service';
import { ChatMessage } from '../shared/models/chat-message';

@Component({
  selector: 'app-chat-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent {
  public nickname: string = '';
  public chatMessage: string = '';
  public errorMessage!: string;

  @Output() public nicknameSet = new EventEmitter<string>();
  @Output() public messageAdded = new EventEmitter<{ nickname: string, message: string }>();

  private destroyRef = inject(DestroyRef);

  constructor(private chatService: ChatService) {}

  public addMessage(message: string): void {
    message = message.trim();

    if (!message) {
      return;
    }

    const messageToSend: ChatMessage = {
      message: message,
      nickname: this.nickname,
    };

    this.chatService
      .addToHistory(messageToSend)
      .pipe(
        tap(() => {
          this.chatMessage = '';
          this.errorMessage = '';
        }),
        finalize(() => {
          // Optional: Cleanup logic after completion
        }),
        takeUntilDestroyed(this.destroyRef),
        catchError((error: Error) => {
          this.errorMessage = error.message;
          console.error(error);
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.messageAdded.emit({ nickname: this.nickname, message });
      });
  }

  public addEmoji(emoji: string): void {
    this.chatMessage += emoji;
  }

  public setNickname() {
    if (this.nickname.trim() !== '') {
      this.nicknameSet.emit(this.nickname);
    }
  }
}
