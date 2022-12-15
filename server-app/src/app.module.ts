import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoDbConnectionModule } from './database/dbConnection.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './services/auth/auth.module';
import { UserModule } from './services/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongoDbConnectionModule,
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
    UserModule
  ],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule { }
