import {
  FileTypeValidator,
  FileValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

class CustomFileTypeValidator
  extends FileTypeValidator
  implements FileValidator
{
  buildErrorMessage(file: Express.Multer.File): string {
    return `Tipo de arquivo inválido: apenas JPEG e PNG são permitidos`;
  }
}

export const FileSizeValidationPipe = () => {
  return new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({
        maxSize: 1000000,
        message: 'O tamanho máximo do arquivo deve ser 1MB',
      }),
      new CustomFileTypeValidator({
        fileType: /^(image\/jpeg|image\/png)$/,
        fallbackToMimetype: true,
      }),
    ],
  });
};
