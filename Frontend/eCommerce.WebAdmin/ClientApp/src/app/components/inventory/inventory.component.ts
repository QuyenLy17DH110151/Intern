import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchRequestInventory, UpdateInventoryRequest } from 'src/app/api-clients/models/_index';
import { InventoryClient } from 'src/app/api-clients/_index';

@Component({
  selector: 'app-invoice',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  public inventories = [];

  constructor(private inventoryClient: InventoryClient, private toastr: ToastrService, private router: Router) {
    this.getData();
  }

  getData() {
    this.inventoryClient.getListInventory().subscribe((res) => {
      this.inventories = res.items;
    });

  }

  public settings = {
    hideSubHeader: true,
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
        title: 'Name',
        valuePrepareFunction: (product) => {
          return product.name;
        },
      },
      ownerUsername: {
        title: 'Username'
      },
      quantity: {
        title: 'Quantity'
      },
    },
  };

  onSaveConfirm(event) {
    console.log(event)
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
