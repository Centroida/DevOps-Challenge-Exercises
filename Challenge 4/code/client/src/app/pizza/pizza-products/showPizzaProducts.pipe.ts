import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'showPizzaProducts'})
export class ShowPizzaProductsPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        console.log();
        let products: string;
        products = value.dough[0].name;
        [ 'sauce', 'cheese', 'meat', 'vegetables']
        .forEach(type => {
            if (value[type]) {
                value[type].forEach(product => {
                    products = products + ', ' + product.name;
                });
            }
        });

        return products;
    }
}
