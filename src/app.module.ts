import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/devConfigService';

// for Non-Service Provider
const devConfig = {
  port: 3000,
};
const proConfig = {
  port: 400,
};
////

@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [
    AppService,
    // use for devconfigservice
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    ///////////

    //Non-Service Provider
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
    //
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // throw new Error('Method not implemented.');

    // option 1 // it works for all routes
    // consumer.apply(LoggerMiddleware).forRoutes('songs');

    // option 2 // it works for specific route works only for post route
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST });

    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
