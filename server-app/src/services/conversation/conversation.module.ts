import { Module } from '@nestjs/common';
import { MongoDBModule } from '../mongodb/mongodb.module';
import { ConversationController } from './../../controllers/conversation/conversation.controller';
import { ConversationService } from './conversation.service';

@Module({
  imports: [MongoDBModule],
  controllers: [ConversationController],
  providers: [ConversationService]
})
export class ConversationModule { }
