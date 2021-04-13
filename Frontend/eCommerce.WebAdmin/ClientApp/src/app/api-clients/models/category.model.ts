export class Category {
    id: string;
    name: string;
    items: any;
}

export class CategoryReturnModel {
    items: object[];
    totalRows: number;
    totalPages: number;
}
