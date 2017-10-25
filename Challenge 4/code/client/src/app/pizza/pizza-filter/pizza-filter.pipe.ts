import { Pizza } from './../../models/Pizza';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pizzaFilter'
})
export class PizzaFilterPipe implements PipeTransform {

    transform(value: Pizza[], filter: string): Pizza[] {
        if (filter.toLowerCase() === 'all') {
            return value;
        }

        return value.filter(x => x.type === filter.toLowerCase());
    }
}
