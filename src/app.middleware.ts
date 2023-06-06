import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class MyMiddleWare implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    // req['typeOfReq'] = 'Manav Req';

    // res.status(200).json({
    //     message: "Middleware said you Hello",
    // });

    next();
  }
}
