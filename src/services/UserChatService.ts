import { HttpClient, HttpContext } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/shared/environment";
import { UserDisplay } from "./models/Users/UserDisplay";
import { SkipLoading } from "./LoadingInterceptor";
import { ChatMessageModel } from "./models/ChatModels/ChatMessageModel";
import { UserDisplayPagination } from "./models/Users/UserDisplayPagination";

const userChatServiceUrl = environment.baseUrl + '/user/chat'
@Injectable({
    providedIn: 'root',
})
export class UserChatService {
    
    constructor(
        private http: HttpClient
    ){
    }

    searchUsers(searchValues: string) {
        let localUrl = userChatServiceUrl + "/SearchUsers?searchValues=" + searchValues;
        return this.http.get<UserDisplay[]>(localUrl, {
            context: new HttpContext().set(SkipLoading, true),
        });
    }

    getRecentChatUser(userId: string, lastChatSessionId: number) {
        let localUrl = userChatServiceUrl + "/GetRecentChatUser?userId=" + userId + "&lastChatSessionId=" + lastChatSessionId;
        return this.http.get<UserDisplayPagination>(localUrl); 
    }

    sendMessages(chatMessage: ChatMessageModel) {
        let localUrl = userChatServiceUrl + '/SendMessage';
        return this.http.post(localUrl, chatMessage);
    }
}