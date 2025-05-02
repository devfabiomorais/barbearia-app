import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';

export type PrismaClientError = PrismaClientUnknownRequestError & {
  meta?: { target: string; cause: string };
  code?: string;
};
