import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class InterceptorClass implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    req['RequestType'] = 'Checking';
    return next.handle().pipe(
      tap((data) => {
        data.response = {
          original_message: data.message,
          intercepted_message: 'Intercepted',
        };
      }),
    );
  }
}
