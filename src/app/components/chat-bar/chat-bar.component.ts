import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-bar',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './chat-bar.component.html',
  styleUrl: './chat-bar.component.css'
})
export class ChatBarComponent {
  public chatMessage!: string;
  public errorMessage!: string;


  public addMessage(message: string): void{
    if (!message){
      this.errorMessage = "Bitte eine Nachricht eingeben";
    }

    alert(message);
  }
}
