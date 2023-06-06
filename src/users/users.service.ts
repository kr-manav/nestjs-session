import { Inject } from '@nestjs/common';

export class UserService {
  // constructor(@Inject('dbname') private service: any) {
  //   console.log(
  //     '🚀 ~ file: users.service.ts:6 ~ UserService ~ constructor ~ this.service:',
  //     this.service,
  //   );
  // }
  all() {
    return 'hello';
  }
}
