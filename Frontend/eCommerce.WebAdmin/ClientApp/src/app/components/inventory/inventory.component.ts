import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpdateInventoryRequest } from 'src/app/api-clients/models/_index';
import { InventoryClient } from 'src/app/api-clients/_index';
import { CustomEditorComponent } from './CustomEditorComponent.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  providers: [DatePipe],

})
export class InventoryComponent implements OnInit {

  public inventories = [];

  constructor(private inventoryClient: InventoryClient, private toastr: ToastrService, private router: Router, private datePipe: DatePipe) {
    this.getData();
  }

  getData() {
    this.inventoryClient.getListInventory().subscribe((res) => {
      this.inventories = res.items;
    });
  }

  public settings = {
    pager: {
      display: true,
      perPage: 5,
    },
    edit: {
      confirmSave: true,
    },
    actions: {
      edit: true,
      delete: false,
      add: false
    },
    columns: {
      product: {
        title: 'Product',
        editable: false,
        valuePrepareFunction: (product) => {
          return product.name;
        },
        editor: {
          type: 'custom',
          component: CustomEditorComponent,
        },
      },
      productCategoryName: {
        title: 'Category',
        editable: false,
      },
      ownerUsername: {
        title: 'Owner',
        editable: false,
      },
      quantity: {
        title: 'Quantity'
      },
      lastUpdated: {
        title: 'Last Updated',
        editable: false,
        valuePrepareFunction: (lastUpdated) => {
          return lastUpdated != null ? this.datePipe.transform(
            new Date(lastUpdated),
            'dd MMM yyyy'
          ) : "";
        },
      },
      lastUpdatedBy: {
        title: 'Last Updated By',
        editable: false,
      },
    },
  };

  onSaveConfirm(event) {
    let quantity = event.newData.quantity;
    if (!/\d/.exec(quantity)) {
      this.toastr.error("quantity not number", "Erro");
      return;
    }
    if (quantity < 0) {
      this.toastr.error("quantity not negative", "Erro");
      return;
    }
    this.inventoryClient.updateInventory(new UpdateInventoryRequest(event.data.id, quantity, event.data.rowVersion)).subscribe(() => {
      this.toastr.success('Change Inventory Success!', 'Notification');
      this.getData();
    }
    )
  }

  ngOnInit() {
  }

  onInventoryRowSelected(event) {
    const productId = event.data.product.id;
    this.router.navigate(['/products/product-detail', productId]);
  }

}
