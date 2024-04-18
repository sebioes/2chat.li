import { Component } from '@angular/core';
import { ChatBarComponent } from './components/chat-bar/chat-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ChatBarComponent, ChatHistoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  public title = "2Chat"
  public messageHistory: { message: string, timestamp: Date }[] = [];

  
  public messageSend(message: string) {
    this.messageHistory.push({ message, timestamp: new Date() });
  }
}
