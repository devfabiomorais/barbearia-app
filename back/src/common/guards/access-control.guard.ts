import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  Type,
} from '@nestjs/common';
import { ForbiddenError } from '../errors/types/ForbiddenError';
import { Functionality } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

export function AccessControlGuard(options: {
  FunctionalityId: number;
}): Type<CanActivate> {
  @Injectable()
  class FunctionalityGuardMixin implements CanActivate {    
    private jwtAuthGuard = new (AuthGuard('jwt'))();

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isAuthenticated = await this.jwtAuthGuard.canActivate(context);
      if (typeof isAuthenticated === 'boolean' && !isAuthenticated) {
        return false;
      }
      
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      
      const hasPermission = user?.functionalities?.find(
        (item: Functionality) => item.id == options.FunctionalityId,
      );

      if (!hasPermission) {
        throw new ForbiddenError(
          'Usuário não possui acesso a essa funcionalidade',
        );
      }

      return true;
    }
  }

  return mixin(FunctionalityGuardMixin);
}
