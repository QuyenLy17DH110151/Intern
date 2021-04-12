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
    price: any;
    category: ProductCategory;
    owner: User;
    photos: string[];
    items: any;
}

class ProductCategory {
    id: string;
    name: string;
}

class User {
    id: string;
    username: string;
}

export class SearchRequestProduct {
    searchTerm?: string;
    sort?: string;
    pageNumber?: string;
    pageSize?: string;
    Username?: string;
    CategoryName?: string;
}
