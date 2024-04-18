import { Component } from '@angular/core';
import { ChatBarComponent } from './components/chat-bar/chat-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ChatBarComponent, ChatHistoryComponent, ChatMessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  public title = "2Chat";
  public messageHistory: { nickname: string, message: string, timestamp: Date }[] = [];
  public userNickname: string = '';


  setNickname(nickname: string) {
    this.userNickname = nickname;
  }

  public messageSend(data: { nickname: string, message: string }): void {
    this.messageHistory.push({ ...data, timestamp: new Date() });
  }
}


