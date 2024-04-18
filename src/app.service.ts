import { Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/devConfigService';

@Injectable()
export class AppService {

  // used for devConfigService
  constructor(private devConfigService: DevConfigService) {}

  getHello(): string {
    
  // used for devConfigService
    return `Hello World! ${this.devConfigService.getDBHOST()}`;
  }
}
