import { Module } from '@nestjs/common';
import { MongoDbConnectionModule } from './../../database/dbConnection.module';
import { MongoDBService } from './mongodb.service';

@Module({
  imports: [MongoDbConnectionModule],
  providers: [MongoDBService],
  exports: [MongoDBService]
})
export class MongoDBModule { }
