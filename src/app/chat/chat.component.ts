import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Window } from '@popperjs/core';
import { ChatMessageDisplay } from 'src/services/models/ChatModels/ChatMessageDisplay';
import { ChatMessageInsertModel } from 'src/services/models/ChatModels/ChatMessageInsertModel';
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

  chatMessage: ChatMessageInsertModel = new ChatMessageInsertModel();

  // chatDisplay: ChatMessageDisplay[] = [];

  isEmojiPickerVisible!: boolean;

  constructor (public signalService: SignalrService
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
    console.log("chat session id: " + this.selectedUser.chatSessionId);
    if (this.selectedUser.chatSessionId !== undefined) {
      this.getRecentChatMessage(this.selectedUser);

    }
  }

  sendMessage() {
    let userId = localStorage.getItem('userId');

    if (userId !== null) {
      this.chatMessage.chatSessionId = this.selectedUser.chatSessionId;
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


  getRecentChatMessage = (selectedUser: UserDisplay) => {
    var yourDate = new Date();
    this.userChatService.getRecentChatMessage(selectedUser.chatSessionId, yourDate.toLocaleString()).subscribe({
      next: (data) => {
          this.signalService.chatDisplay = data.chats;
      },
      error: (errorRes) => {
      }
    });
  }
}
