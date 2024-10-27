import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr"
import { environment } from "src/shared/environment";
import { ChatMessageDisplay } from "./models/ChatModels/ChatMessageDisplay";
import { UserChatService } from "./UserChatService";
import { UserDisplay } from "./models/Users/UserDisplay";
import { AppComponent } from "src/app/app.component";
import { ChatMessageModel } from "./models/ChatModels/ChatMessageModel";

@Injectable({
    providedIn: 'root'
})
export class SignalrService {
    public chatDisplay: ChatMessageDisplay[] = [];
    private hubConnection!: signalR.HubConnection;

    public startConnection = () => {
        let token = localStorage.getItem('token');
        this.hubConnection = new signalR.HubConnectionBuilder()
                                .withUrl(environment.baseUrl + '/chat', { accessTokenFactory: () => {
                                    if (token === null) {
                                       return ""
                                    }
                                    return token;
                                }})
                                .build();

        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err));
    }

    public messageListener = () => {
        this.hubConnection.on('MessageListener', (chatMessageModel: ChatMessageModel) => {
            if (chatMessageModel !== undefined) {
              this.addNewMessageToChatDisplayList(chatMessageModel);
            }
          });
    }

    public addNewMessageToChatDisplayList(chatMessageModel: ChatMessageModel) {
      let chatMessesageModelHour = new Date(chatMessageModel.createdDate);
      let chatDisplayHour = new Date(this.chatDisplay[this.chatDisplay.length-1].chatDate);

      let hourBetweenChat = chatMessesageModelHour.getMinutes() - chatDisplayHour.getMinutes();
      let dayBetweenChat = chatMessesageModelHour.getDay() - chatDisplayHour.getDay();

      if(hourBetweenChat < 1 && dayBetweenChat <= 1) {
        this.chatDisplay[this.chatDisplay.length-1].listOfChatMessage.push(chatMessageModel);
      } else {
        let hubMessageListenerChatDisplay = new ChatMessageDisplay();
        hubMessageListenerChatDisplay.listOfChatMessage = [];

        hubMessageListenerChatDisplay.chatDate = chatMessageModel.createdDate;
        hubMessageListenerChatDisplay.listOfChatMessage.push(chatMessageModel);

        this.chatDisplay.push(hubMessageListenerChatDisplay);
      }
    }

    public addConnectedUserListener = () => {
        this.hubConnection.on('connected', (users: string[]) => {
            console.log(users);
        })
    }

    public send = (userId: string, chatMessage: string) => {
        this.hubConnection.send("SendChatMessage", userId, chatMessage);
    }

    public getConnectedUser = () => {
        this.hubConnection.send("getConnectedUser");
    }
}
