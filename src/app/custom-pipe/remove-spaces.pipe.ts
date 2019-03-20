import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'removeSpaces' })
export class RemoveSpacesPipe implements PipeTransform {
    transform(value: string): string {
        return value ? value.split(' ').join('-').toLowerCase() : value;
    }
}
