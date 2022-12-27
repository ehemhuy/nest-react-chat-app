import { BaseModel } from "../baseModel";
import { v4 as uuidv4 } from 'uuid';

export class Conversation extends BaseModel {
    ConversationID: string = uuidv4()

    LastestMessage: string

    FromUserID: string

    ToUserID: string
}