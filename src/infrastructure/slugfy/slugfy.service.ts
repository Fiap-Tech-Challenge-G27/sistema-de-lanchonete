import { Injectable } from '@nestjs/common';

@Injectable()
export class SlugfyService {
  slugfy(text: string): string {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
}
