import { Controller, Inject, Scope } from '@nestjs/common';

@Controller({
  scope: Scope.TRANSIENT,
})
export class UserController {
  constructor(@Inject('dbname') private service: any) {
    console.log(
      '🚀 ~ file: users.service.ts:6 ~ UserService ~ constructor ~ this.service:',
      this.service,
    );
  }
}
