import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
 
}
