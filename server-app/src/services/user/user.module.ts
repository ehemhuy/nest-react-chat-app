import { Module } from '@nestjs/common';
import { UserController } from './../../controllers/user/user.controller';
import { MongoDBModule } from './../mongodb/mongodb.module';
import { UserService } from './user.service';

@Module({
    imports: [MongoDBModule],
    controllers: [UserController],
    providers: [
        UserService
    ],
})
export class UserModule { }
