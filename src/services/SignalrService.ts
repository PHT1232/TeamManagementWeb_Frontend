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
            console.log("Hub chatMessageModel: " + chatMessageModel);
            if (chatMessageModel !== undefined) {
              let localChatDisplay = new ChatMessageDisplay();
              localChatDisplay.chatDate = chatMessageModel.createdDate;
              localChatDisplay.listOfChatMessage.push(chatMessageModel);

              this.chatDisplay.push(localChatDisplay);
            }
          });
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
