export class UpdateInventoryRequest {
    id: string;
    quantity: number;
    rowVersion: string;
    constructor(id: string, quantity: number, rowVersion: string) {
        this.id = id;
        this.quantity = quantity;
        this.rowVersion = rowVersion;
    }
}