import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UpdateInventoryRequest } from 'src/app/api-clients/models/inventory.model';
import { SearchRequestInventory } from 'src/app/api-clients/models/_index';
import { InventoryClient } from 'src/app/api-clients/_index';
import { invoiceDB } from '../../shared/tables/invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  public inventories: SearchRequestInventory[];

  constructor(private inventoryClient: InventoryClient, private toastr: ToastrService) {
    this.getData();
  }

  async getData() {
    this.inventoryClient.getListInventory().subscribe((res) => {
      this.inventories = res.items;
    });

  }

  public settings = {
    delete: {
      confirmDelete: true,
    },
    edit: {
      confirmSave: true,
    },
    actions: {
      custom: [
        {
          name: 'Button',
          title: 'Button ',
        },
      ],
    },
    columns: {
      productName: {
        title: 'Product Name'
      },
      ownerUsername: {
        title: 'Owner Username'
      },
      quantity: {
        title: 'Quantity'
      }
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
    })
  }
  ngOnInit() {
  }

}
