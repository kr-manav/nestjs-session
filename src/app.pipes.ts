import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class CustomPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log("🚀 ~ file: app.pipes.ts:5 ~ CustomPipe ~ transform ~ metadata:", metadata)
    switch (value.type) {
      case 'string':
        return '1';
      case 'number':
        return 1;
      case 'boolean':
        return true;
      default:
        return 0;
    }
  }
}
