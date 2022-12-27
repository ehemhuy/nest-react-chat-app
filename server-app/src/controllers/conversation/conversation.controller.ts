import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ConversationService } from './../../services/conversation/conversation.service';

interface FilterConversationBody {
    userID: string
}

@Controller('conversation')
export class ConversationController {
    constructor(private readonly conversationService: ConversationService,
    ) { }

    @Post('/filter')
    async login(@Body() body: FilterConversationBody, @Res() response: Response): Promise<any> {
        try {
            const serviceResponse = await this.conversationService.getConversation(body.userID);
            return response.status(200).send(serviceResponse).end()
        } catch (error) {
            return new BadRequestException()
        }
    }
}
