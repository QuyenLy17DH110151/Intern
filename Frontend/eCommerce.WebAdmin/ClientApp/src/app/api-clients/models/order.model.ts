export class Order {
    stt: number;
    id: string;
    buyerName: string;
    buyerPhone: string;
    buyerEmail: string;
    address: string;
    price: number;
    quantity: number;
    product: Product;
    status: OrderStatus;
    createdDate: Date;
    // createBy: string;
    // lastUpdate?: Date;
    // lastUpdateBy?: string;
}

class Product {
    id: string;
    name: string;
}

enum OrderStatus {
    New = 1,
    Approved = 2,
    Cancelled = 3
}

export class SearchOrderPaging {

}
