import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'deliveryStatus'
})
export class DeliveryStatusPipe implements PipeTransform {

    transform(orderDate: Date): string {
        const diff = Math.abs(new Date().getTime() - new Date(orderDate).getTime());
        const minutes = Math.floor((diff / 1000) / 60);
        const after = 30 - Math.floor((diff / 1000) / 60);

        if (minutes > 30) {
            return ` DELIVERED`;
        } else {
            return ` Coming in ${after} minutes`;
        }
    }
}
