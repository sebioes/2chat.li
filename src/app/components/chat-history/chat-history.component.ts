import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { catchError, finalize, takeUntil, tap } from 'rxjs/operators';
import { ChatMessage } from '../shared/models/chat-message';
import { ChatService } from '../shared/services/chat.service';

@Component({
  selector: 'app-chat-history',
  standalone: true,
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css'],
  providers: [DatePipe] // Add DatePipe as provider
})
export class ChatHistoryComponent implements OnInit, OnDestroy {
  @Input() public history: { nickname: string, message: string, timestamp: Date }[] = [];
  @Input() public nickname = '';

  public errorMessage!: string;

  private chatMessagesSubscription: Subscription | undefined;

  constructor(private chatService: ChatService, private datePipe: DatePipe) {} // Inject DatePipe

  ngOnInit(): void {
    this.getHistory();

    // Update chat messages every 2 seconds
    const interval = 2000; // in milliseconds
    this.chatMessagesSubscription = timer(0, interval).pipe(
      takeUntil(timer(1000 * 60 * 60 * 24)), // Unsubscribe after a day
      tap(() => this.getHistory())
    ).subscribe();
  }

  ngOnDestroy(): void {
    // Clean up subscription
    if (this.chatMessagesSubscription) {
      this.chatMessagesSubscription.unsubscribe();
    }
  }

  private getHistory(): void {
    this.chatService.getChatMessages().pipe(
      tap((response: ChatMessage[]) => {
        this.history = response.map(message => ({
          nickname: message.nickname,
          message: message.message,
          timestamp: message.createdAt ? new Date(message.createdAt) : new Date()
        }));
      }),
      catchError((error: Error) => {
        this.errorMessage = error.message;
        console.error(error);
        return [];
      }),
      finalize(() => console.log('done!'))
    ).subscribe();
  }

  formatTimestamp(timestamp: Date): string {
    return this.datePipe.transform(timestamp, 'short') || ''; // Format timestamp using DatePipe
  }
}
