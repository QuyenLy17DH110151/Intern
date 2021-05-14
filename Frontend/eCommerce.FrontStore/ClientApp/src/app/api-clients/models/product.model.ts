export class Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  owner: User;
  photos: Photos[];
  description: string;
  lastUpdated: Date;
  inventory: Inventory;
}
export class Inventory {
  quantity: number;
}

class Photos {
  id: string;
  url: string;
}

export class ProductCategory {
  id: string;
  name: string;
  c1Lable: string;
  c1Options: string;
  c2Lable: string;
  c2Options: string;
  c3Lable: string;
  c3Options: string;
  c4Lable: string;
  c4Options: string;
  c5Lable: string;
  c5Options: string;
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
  ownerName?: string;
  categoryName?: string;
  minPrice?: string;
  maxPrice?: string;
  pageIndex?: string;
}
