export class Product {
    name: string;
    price: number;
    categoryId: string;
    quantity: number;
    description: string;
    photos: string[];
}

export class ProductList {
    id: string;
    name: string;
    price: number;
    category: ProductCategory;
    owner: User;
    photos: string[];
    items: any;
    description: string;
}

class ProductCategory {
    id: string;
    name: string;
}

class User {
    id: string;
    username: string;
}



