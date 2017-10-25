import { Order } from './Order';
import { Cart } from './Cart';
import { CustomPizza } from './CustomPizza';
import { Pizza } from './Pizza';
import { Product } from './Product';

export class User {
    username: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: number;
    password: string;
    cart: Cart;
    orders: Order[];
}
