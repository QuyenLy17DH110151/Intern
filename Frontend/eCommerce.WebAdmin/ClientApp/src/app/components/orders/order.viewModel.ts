import { Order } from "src/app/api-clients/models/order.model";

export class OrderViewModel {
    index: number;
    id: string;
    customer: string;
    email: string;
    phoneNumber: string;
    address: string;
    product: any;
    quantity: number;
    price: number;
    totalAmount: number;
    createdDate: Date;
    statusString: string;

    constructor(order: Order, index: number) {
        this.index = index + 1;
        this.id = order.id;
        this.customer = order.buyerName;
        this.email = order.buyerEmail;
        this.phoneNumber = order.buyerPhone;
        this.address = order.address;
        this.product = order.product;
        this.quantity = order.quantity;
        this.price = order.price;
        this.totalAmount = order.totalAmount;
        this.createdDate = order.createdDate;
        this.statusString = (function () {
            if (order.status === 0) return 'New';

            if (order.status === 1) return 'Approved';

            if (order.status === 2) return 'Cancelled';
        })();
    }
}
