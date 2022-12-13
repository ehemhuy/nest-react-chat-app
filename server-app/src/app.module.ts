import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoDbModule } from './database/mongodb.module';
import { MongoDBService } from './database/mongodb.service';
import { EventsModule } from './events/events.module';
import { AuthModule } from './services/auth/auth.module';
import { UserService } from './services/user/user.service';
import { UserModule } from './services/user/user.module';
import { AuthController } from './controllers/auth/auth.controller';
import { UserController } from './controllers/user/user.controller';

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
    EventsModule,
    AuthModule,
    // UserModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, MongoDBService],
})
export class AppModule { }
