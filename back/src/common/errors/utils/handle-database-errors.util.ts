import { DatabaseError } from '../types/DatabaseError';
import { PrismaClientError } from '../types/PrismaClientError';
import { RecordNotFoundError } from '../types/RecordNotFoundError';
import { UniqueConstraintError } from '../types/UniqueConstraintError';

enum PrismaErrors {
  UniqueConstraintFail = 'P2002',
  RecordToUpdateNotFound = 'P2025',
}

export const handleDatabaseErrors = (e: PrismaClientError): Error => {
  switch (e?.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);
    case PrismaErrors.RecordToUpdateNotFound:
      return new RecordNotFoundError(e);

    default:
      return new DatabaseError(e.message);
  }
};
