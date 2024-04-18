import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';

@Module({
  controllers: [SongsController],
  //providers: [SongsService]  //standard provider or single instance cached


  // used for multiple instances for multiple use
  // providers: [
  //   {
  //     provide: SongsService,
  //     useClass: SongsService
  //   }
  // ]

  providers: [
    SongsService,
     //used for connection.ts
    {
      provide: 'CONNECTION',
      useValue: connection
    }
  ]

})
export class SongsModule {}
