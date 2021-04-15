import { Product } from "./product.model";

export class Order {
    stt: number;
    id: string;
    orderDate: Date;
    address: string;
    buyerName: string;
    status: OrderStatus;
    price: number;
    buyerPhone: string;
    productId: string;
    productName: string;
    quantity: number;
    buyerEmail: string;
    createDate: Date;
    createBy: string;
    lastUpdate?: Date;
    lastUpdateBy?: string;
    product: Product;
}

enum OrderStatus {
    New = 1,
    Approved = 2,
    Cancelled = 3
}

export class SearchOrderPaging {

}
