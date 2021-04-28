import { min } from "rxjs/operators";

export class Coupon {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    minPrice: number;
    value: number;
}

export class CreateCouponRequest {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    minPrice: number;
    value: number;

    constructor(name: string, description: string, startDate: Date, endDate: Date, minPrice: number, value: number) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.minPrice = minPrice;
        this.value = value;
    };
}

