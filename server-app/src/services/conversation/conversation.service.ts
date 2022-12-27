import { CONVERSATION_COLLECTION } from './../../constants/collectionName';
import { Conversation } from './../../entities/conversation/conversation.entity';
import { MongoDBService } from './../mongodb/mongodb.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversationService {
    constructor(private readonly _mongoDBService: MongoDBService) {

    }

    async getConversation(userID: string): Promise<Conversation[]> {
        return await this._mongoDBService.getAllAsync<Conversation>(CONVERSATION_COLLECTION, { FromUserID: userID });
    }
}
