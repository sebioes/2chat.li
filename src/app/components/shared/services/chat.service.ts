import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChatMessage } from '../models/chat-message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly baseUrl = 'https://api.2chat.li/';

  public constructor(private httpClient: HttpClient) {}

  public getChatMessages(): Observable<ChatMessage[]> {
    return this.httpClient.get<ChatMessage[]>(`${this.baseUrl}history`);
  }

  public addToHistory(message: ChatMessage): Observable<ChatMessage[]> {
    return this.httpClient.post<ChatMessage[]>(
      `${this.baseUrl}history`,
      message
    );
  }
}
