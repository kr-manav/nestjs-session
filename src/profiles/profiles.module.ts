import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ProfileController } from './profiles.controller';
import { ProfileService } from './profiles.services';

@Module({
  imports: [UsersModule.register({ requester: 'profiles' })],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfilesModule {
  constructor() {
    console.log('Profiles.....');
  }
}
