import { DynamicModule, Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';

let ROOT_OPTIONS;

@Module({
  imports: [],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class RootUserModule {}

@Module({
  imports: [],
  providers: [
    UserController,
    {
      provide: UserService,
      useClass: UserService,
    },
    {
      provide: 'db',
      useValue: 'MySQL',
    },
    {
      provide: 'dbname',
      useFactory: (dbtype) => {
        return dbtype + '/User';
      },
      inject: ['db'],
    },
  ],
  controllers: [UserController],
  exports: [UserService, UserController],
})
export class UsersModule {
  static register(options: any): DynamicModule {
    return {
      module: UsersModule,
      providers: [
        {
          provide: 'dbname',
          useFactory: (dbtype) => {
            return dbtype + '/' + options.requester;
          },
          inject: ['db'],
        },
      ],
    };
  }

  static forRoot(options: any): DynamicModule {
    ROOT_OPTIONS = options;
    return {
      imports: [],
      module: UsersModule,
      providers: [
        {
          provide: 'db',
          useValue: options.db,
        },
      ],
    };
  }

  static forFeature(options: any): DynamicModule {
    options = {
      ...ROOT_OPTIONS,
      ...options,
    };
    return {
      module: UsersModule,
      providers: [
        {
          provide: 'dbname',
          useFactory: () => {
            return options.db + '/' + options.dbName;
          },
        },
      ],
    };
  }
}
