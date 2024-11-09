import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Window } from '@popperjs/core';
import { ChatMessageDisplay } from 'src/services/models/ChatModels/ChatMessageDisplay';
import { ChatMessageInsertModel } from 'src/services/models/ChatModels/ChatMessageInsertModel';
import { UserDisplay } from 'src/services/models/Users/UserDisplay';
import { SignalrService } from 'src/services/SignalrService';
import { UserChatService } from 'src/services/UserChatService';
import { AppComponent } from '../app.component';
import { ChatMessageModel } from 'src/services/models/ChatModels/ChatMessageModel';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() selectedUser: UserDisplay = new UserDisplay();

  onScroll(el: HTMLElement): void {
    console.log("innerheight: " + this.chatTemplate.nativeElement.offsetHeight);
    console.log("windowY: " + this.chatTemplate.nativeElement.scrollTop);
    let scrollTop = this.chatTemplate.nativeElement.scrollTop;
    if (scrollTop === 0) {
      for (let i = 0; i < 5; i++) {
        this.signalService.chatDisplay.push(this.chatDisplay[i]);
      }
      this.scrollTop += 20;
    }
    // this.first.nativeElement.scrollIntoView({behavior: 'smooth'});

    // el.scrollIntoView({behavior: 'smooth'});
  }

  @ViewChild('chatTemplate') chatTemplate!: ElementRef;

  @ViewChild('first') first!: ElementRef;

  scrollTop!: any;

  height: number = 100;

  currentDate = new Date();

  value: string = "";

  chatMessageSendingList: ChatMessageInsertModel[] = [];

  isEmojiPickerVisible!: boolean;

  chatDisplay: ChatMessageDisplay[] = [];

  constructor (public signalService: SignalrService
              , private userChatService: UserChatService
              , private appMain: AppComponent
              , private cdref: ChangeDetectorRef)
      {
        console.log('width: ' + window.innerHeight);
        // console.log("windowY: " + this.chatTemplate.nativeElement.scrollTop);
      }

  ngOnInit(): void {

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
      console.log("scrollHeight: " + this.chatTemplate.nativeElement.scrollHeight);
    }
  }

  ngAfterContentChecked(changes: SimpleChanges) {
    if (this.first !== undefined && this.selectedUser.chatSessionId !== undefined) {
      this.first.nativeElement.scrollIntoView({behavior: 'smooth'});
    }
    // this.cdref.detectChanges();
  }

  sendMessage() {
    let userId = localStorage.getItem('userId');
    let chatMessage = new ChatMessageInsertModel();

    if (userId !== null) {
      chatMessage.chatSessionId = this.selectedUser.chatSessionId;
      chatMessage.sentId = userId;
      chatMessage.receivedId = this.selectedUser.userId;
      chatMessage.message = this.value;
    }

    this.chatMessageSendingList.push(chatMessage);
    this.value = "";

    this.userChatService.sendMessages(chatMessage).subscribe({
      next: (returnData) => {
        let index = this.chatMessageSendingList.findIndex(e => e.message === returnData.chatMessage && e.sentId === returnData.sentUserId);
        this.chatMessageSendingList.splice(index, 1);

        this.signalService.addNewMessageToChatDisplayList(returnData);
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
          // this.signalService.chatDisplay = data.chats;
          this.chatDisplay = data.chats;
          for (let i = 0; i < 5; i++) {
            this.signalService.chatDisplay.push(this.chatDisplay[i]);
          }
      },
      error: (errorRes) => {
      }
    });
  }
}
