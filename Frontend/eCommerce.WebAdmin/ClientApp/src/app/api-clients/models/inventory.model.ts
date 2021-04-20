
class InventoryBase {
    id: string;
    quantity: number;
    rowVersion: string;
    constructor(id: string, quantity: number, rowVersion: string) {
        this.id = id;
        this.quantity = quantity;
        this.rowVersion = rowVersion;
    }
}

export class UpdateInventoryRequest extends InventoryBase {

    constructor(id: string, quantity: number, rowVersion: string) {
        super(id, quantity, rowVersion);
    }
}

export class Inventory extends InventoryBase {
    product: ProductInventory;
}

export class ProductInventory {
    id: string;
    name: string;
    price: number;
    ownerUsername: string;
}
