import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [],
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.css'
})
export class ChatHistoryComponent {

  @Input() public history = ""

}
