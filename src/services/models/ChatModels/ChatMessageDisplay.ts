export class ChatMessageDisplay {
    id!: number;
    sentUserId!: string;
    chatMessage!: string;
    createdDate!: Date;
    isRead: boolean = false;
}