import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalLetter'
})
export class CapitalLetterPipe implements PipeTransform {

    transform(value: string): string {
        return value
            .split(' ')
            .map(x => x[0].toUpperCase() + x.substring(1).toLowerCase())
            .join(' ');
    }

}
