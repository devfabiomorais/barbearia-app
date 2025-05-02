import { NotFoundError } from './NotFoundError';
import { PrismaClientError } from './PrismaClientError';

export class RecordNotFoundError extends NotFoundError {
  constructor(e: PrismaClientError) {
    const id = e?.meta?.target;

    super(`Não foi encontrado nenhum registro com o id informado. ${id}`);
  }
}
