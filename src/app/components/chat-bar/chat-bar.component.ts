import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-bar.component.html',
  styleUrl: './chat-bar.component.css'
})
export class ChatBarComponent {
  public nickname: string = '';
  public chatMessage: string = '';
  public errorMessage!: string;

  @Output() public nicknameSet = new EventEmitter<string>();
  @Output() public messageAdded = new EventEmitter<{ nickname: string, message: string }>();

  public addMessage(message: string): void {
    if (!message) {
      return;
    }
  
    this.messageAdded.emit({ nickname: this.nickname, message });
    this.chatMessage = '';
  }

  setNickname() {
    if (this.nickname.trim() !== '') {
      this.nicknameSet.emit(this.nickname);
    }
  }
  
}

