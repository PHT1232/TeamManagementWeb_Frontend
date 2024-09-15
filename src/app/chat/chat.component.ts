import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Window } from '@popperjs/core';
import { ChatMessageDisplay } from 'src/services/models/ChatModels/ChatMessageDisplay';
import { ChatMessageModel } from 'src/services/models/ChatModels/ChatMessageModel';
import { UserDisplay } from 'src/services/models/Users/UserDisplay';
import { SignalrService } from 'src/services/SignalrService';
import { UserChatService } from 'src/services/UserChatService';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @Input() selectedUser: UserDisplay = new UserDisplay();

  height: number = 100;

  value: string = "";

  chatMessage: ChatMessageModel = new ChatMessageModel();

  chatDisplay: ChatMessageDisplay[] = [];

  isEmojiPickerVisible!: boolean;

  constructor (private signalService: SignalrService
              , private userChatService: UserChatService    
              , private appMain: AppComponent) 
      {
        this.signalService.startConnection();
        this.signalService.messageListener();
        this.signalService.addConnectedUserListener();
        console.log('width: ' + window.innerHeight)
      }

  addEmoji(event: any) {
    this.height = 100;

    this.value += event.emoji.native;
    this.isEmojiPickerVisible = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.selectedUser.chatSessionId);
    if (this.selectedUser.chatSessionId !== undefined) {
      var yourDate = new Date();
      this.userChatService.getRecentChatMessage(this.selectedUser.chatSessionId, yourDate.toLocaleString()).subscribe({
        next: (data) => {
            this.chatDisplay = data.chats;
        },
        error: (errorRes) => {
          this.appMain.showMessage('error', errorRes.error.title);
        }
      });
    }
  }

  sendMessage() {
    let userId = localStorage.getItem('userId');

    if (userId !== null) {
      this.chatMessage.chatSessionId = 0;
      this.chatMessage.sentId = userId;
      this.chatMessage.receivedId = this.selectedUser.userId;
      this.chatMessage.message = this.value;
    }

    this.userChatService.sendMessages(this.chatMessage).subscribe({
      next: () => {
        console.log("lol")
      },
      error: (errorRes) => {        
        console.log("lal")
      }
    });
  }

  openEmojimart() {
    if (this.height === 65) {
      this.height = 100;
    } else {
      this.height = 65;
    }
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
  }
}
