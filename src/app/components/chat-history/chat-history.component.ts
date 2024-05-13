import {
  Component,
  DestroyRef,
  ElementRef,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap, finalize, catchError, EMPTY } from 'rxjs';
import { ChatMessage } from '../shared/models/chat-message';
import { ChatService } from '../shared/services/chat.service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [NgClass, DatePipe],
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.css',
})
export class ChatHistoryComponent {
  @Input() public history = '';
  @Input() public nickname = '';

  public chatMessages: ChatMessage[] = [];
  public errorMessage!: string;

  @ViewChild('scrollFrame') private scrollFrame!: ElementRef<HTMLElement>;
  private destroyRef = inject(DestroyRef);
  private chatService = inject(ChatService);

  ngOnInit(): void {
    this.getHistory();
    this.scrollTo();

    setInterval(() => {
      this.getHistory();
    }, 2000);
  }

  private getHistory(): void {
    this.chatService
      .getChatMessages()
      .pipe(
        tap((response: ChatMessage[]) => {
          this.chatMessages = response;
          this.scrollTo();
        }),
        finalize(() => console.log('done!')),
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

  private scrollTo(): void {
    this.scrollFrame?.nativeElement?.scroll({
      top: this.scrollFrame?.nativeElement?.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }
}