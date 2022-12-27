import { MongoDBModule } from './../mongodb/mongodb.module';
import { AuthController } from './../../controllers/auth/auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [MongoDBModule],
  controllers: [AuthController],
  providers: [
    AuthService
  ],
})
export class AuthModule { }
