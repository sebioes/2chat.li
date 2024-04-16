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
  public chatMessage!: string;
  public errorMessage!: string;

  @Output() public messageAdded = new EventEmitter<string>();

  public addMessage(message: string): void {
    if (!message) {
      this.errorMessage = "Bitte eine Nachricht eingeben";
      return;
    }
    this.messageAdded.emit(message);
    this.chatMessage = '';

  }
}
