import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  imports: [
    // UsersModule.forRoot({ db: 'redis' }),
    // UsersModule.forFeature({ dbName: 'jobs' }),
    UsersModule.forFeature({ dbName: 'jobs', db: 'compass' }),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {
  constructor() {
    console.log('Jobs.....');
  }
}
