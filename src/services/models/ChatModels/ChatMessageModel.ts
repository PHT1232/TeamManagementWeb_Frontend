export class ChatMessageModel {
  id!: number;
  sentUserId!: string;
  chatMessage!: string;
  createdDate!: Date;
  isRead: boolean = false;
}
