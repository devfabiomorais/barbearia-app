import { ParseIntPipe } from '@nestjs/common';
import { BadRequestError } from '../errors/types/BadRequestError';

export const IdParamValidatorPipe = () => {
  return new ParseIntPipe({
    exceptionFactory: () => new BadRequestError('O id informado é inválido.'),
  });
};
