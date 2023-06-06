import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { MyMiddleWare } from './app.middleware';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, JobsModule, ProfilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MyMiddleWare).forRoutes('users');
  }
}
