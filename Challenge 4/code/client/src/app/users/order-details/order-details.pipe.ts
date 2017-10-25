import { Cart } from './../../models/Cart';
import { CustomPizza } from './../../models/CustomPizza';
import { element } from 'protractor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderDetails'
})
export class OrderDetailsPipe implements PipeTransform {

    transform(value: Cart): string {
        const classic = value.pizza;
        const custom = value.customPizza;
        let classicDetails = '';
        let customDetails = '';

        if (classic.length > 0) {
            classicDetails = `${classic.length} X Classic Pizza: ${classic.map(v => v.name)}`;
        }
        if (custom.length > 0) {
            customDetails = `${custom.length} X Custom Pizza`;
        }

        return `${classicDetails}
                ${customDetails}`;
    }

}
