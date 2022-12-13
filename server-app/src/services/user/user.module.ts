import { MongoDBService } from './../../database/mongodb.service';
import { UserController } from './../../controllers/user/user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';

@Module({
    controllers: [UserController],
    providers: [
        UserService, MongoDBService
    ],
})
export class UserModule { }
