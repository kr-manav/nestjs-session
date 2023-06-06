import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './app.schema';


@Injectable()
export class AppService {
  // constructor(@Inject(User.name) private appModel: Model<UserDocument>) {}
  getHello(): string {
    return 'Hello World!';
  }
}
