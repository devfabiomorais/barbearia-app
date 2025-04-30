import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { ForbiddenError } from '../types/ForbiddenError';

@Injectable()
export class ForbiddenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof ForbiddenError) {
          throw new ForbiddenException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}

@Catch(ForbiddenError)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    //@ts-ignore
    response.status(HttpStatus.FORBIDDEN).json({
      statusCode: HttpStatus.FORBIDDEN,
      message: exception.message,
    });
  }
}
