import { Component, OnInit } from '@angular/core';
import { SearchRequestProduct } from 'src/app/api-clients/models/product.model';
import { ProductClient } from 'src/app/api-clients/product.client';

@Component({
  selector: 'app-digital-list',
  templateUrl: './digital-list.component.html',
  styleUrls: ['./digital-list.component.scss'],
  providers: [ProductClient]
})
export class DigitalListComponent implements OnInit {
  public product_list: any;
  keyWordSearch: string = '';
  rq: SearchRequestProduct = {};

  constructor(protected productClient: ProductClient) {
    // this.digital_list = digitalListDB.digital_list;
  }

  async loadData() {
    let products = await this.productClient.searchProducts(this.rq).toPromise();
    console.log('Products', products);
    console.log('Request', this.rq);
    this.product_list = products.items;
  }

  public settings = {
    actions: {
      position: 'right',

    },
    columns: {
      photos: {
        title: 'Image',
        type: 'html',
        valuePrepareFunction: (photos) => {
          return '<img src="' + photos[0].url + '" height="150" width="150"/>';
        },
        filter: false,
      },
      name: {
        title: 'Product Name',
      },
      price: {
        title: 'Price',
      },
      category: {
        title: 'Category',
        valuePrepareFunction: (category) => {
          return category.name;
        },
        filterFunction(category?: any, search?: string): boolean {
          if (category.name.toLowerCase().indexOf(search) > -1)
            return true;
          return false;
        },
      },
      owner: {
        title: 'Owner',
        valuePrepareFunction: (owner) => {
          return owner.username;
        },
        filterFunction(owner?: any, search?: string): boolean {
          if (owner.username.toLowerCase().indexOf(search) > -1)
            return true;
          return false;
        },
      }
    },
  };

  ngOnInit() {
    this.loadData();
  }

}
