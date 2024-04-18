import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';

@Controller('songs')
export class SongsController {
  constructor(
    private songsService: SongsService,
    //used for connection.ts
    @Inject('CONNECTION')
    private connection: Connection
    ) {
         //used for connection.ts
        console.log(`This is connection string ${this.connection.CONNECTION_STRING}`)
    }

  @Post()
  create(@Body() createSongsDto: CreateSongDto) {
    return this.songsService.create(createSongsDto);
  }

  @Get()
  findAll() {
    try {
      return this.songsService.findAll();
    } catch (error) {
      // console.log('Catch block', error)
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `Find song on the base of id ${typeof id}`;
  }

  @Put(':id')
  update() {
    return 'Update song on the base of id';
  }

  @Delete(':id')
  delete() {
    return 'Delete song on the base of id';
  }
}
