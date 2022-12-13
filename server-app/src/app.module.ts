import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { MongoDbModule } from './database/mongodb.module';
import { MongoDBService } from './database/mongodb.service';
import { EventsModule } from './events/events.module';
import { UserService } from './services/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongoDbModule,
    CacheModule.register({
      // @ts-ignore
      store: async () => await redisStore({
        // Store-specific configuration:
        socket: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT),
        }
      })
    }),
    EventsModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, MongoDBService],
})
export class AppModule { }
