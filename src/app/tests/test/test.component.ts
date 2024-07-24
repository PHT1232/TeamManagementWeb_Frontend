import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChatService } from 'src/services/ChatService';
import { SignalrService } from 'src/services/SignalrService';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  textArea: string = '';

  constructor(private chatService: ChatService
              , private signalService: SignalrService
              , private http: HttpClient) {}

  ngOnInit(): void {
    this.signalService.startConnection();
    this.signalService.messageListener();
    this.signalService.addConnectedUserListener();
    // this.startHttpRequest();
  }

  // private startHttpRequest = () => {
  //   this.http.get<Chat>('https://192.168.1.14:7279/api/chat/Get')
  //     .subscribe(res => {
  //       console.log(res.chatMessage);
  //     })
  // }
  isEmojiPickerVisible!: boolean;
  addEmoji(event: any) {
    this.textArea = `${event.emoji.id}`;
    this.isEmojiPickerVisible = false;
  }
  click() {
    // let userId = localStorage.getItem('userId');
    // if (userId !== null) {
    //   this.signalService.send(userId, 'toi an com')
    // }
    this.signalService.getConnectedUser();
  }
}
