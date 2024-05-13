import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nickname',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './nickname.component.html',
  styleUrl: './nickname.component.css',
})
export class NicknameComponent {
  @Output() public nicknameCreate = new EventEmitter<string>();

  public nickname = '';
  public message = '';

  public createNickname(nickname: string): void {
    this.nicknameCreate.emit(nickname);
    this.message = `Benutzer: '${nickname}' erstellt`;
  }
}