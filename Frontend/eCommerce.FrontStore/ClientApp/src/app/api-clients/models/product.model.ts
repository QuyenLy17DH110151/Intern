export class Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  owner: User;
  photos: Photos[];
  items?: any;
  description: string;
  lastUpdated: Date;
}

class Photos {
  id: string;
  url: string;
}

export class ProductCategory {
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
  ownerName?: string;
  categoryName?: string;
  minPrice?: string;
  maxPrice?: string;
  pageIndex?: string;
}
