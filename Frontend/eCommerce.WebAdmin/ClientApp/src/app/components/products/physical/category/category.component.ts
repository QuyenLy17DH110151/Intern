import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/api-clients/models/category.model';
import { CategoryClient } from 'src/app/api-clients/category.client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [CategoryClient]
})
export class CategoryComponent implements OnInit {


  category: Category;

  constructor(protected categoryClient: CategoryClient) {


  }

  private getListCategory() {
    this.categoryClient.getListCategory().subscribe(category => {

      this.category = category.items;
    });
  }

  async onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      const response = await this.categoryClient
        .deleteCategory(event.data.id)
        .toPromise();
      this.getListCategory();
      console.log('response: ', response);
      if (response !== null) {
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'Delete Product Category successfully!',
        });
      }
    } else {
      event.confirm.reject();
    }
  }

  async onEditConfirm(event) {
    var data = {
      "name": event.newData.name,
    };

    if (window.confirm('Are you sure you want to edit?')) {
      const response = await this.categoryClient
        .updateCategory(event.newData.id, data)
        .toPromise();
      this.getListCategory();
      console.log('response: ', response);
      if (response !== null) {
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'Update Product Category successfully!',
        });
      } else {
        event.confirm.reject();
      }
    }
  }

  async onCreateConfirm(event) {
    var data = {
      "name": event.newData.name,
    };

    if (window.confirm('Are you sure you want to edit?')) {
      const response = await this.categoryClient
        .addCategory(event.newData)
        .toPromise();
      this.getListCategory();
      console.log('response: ', response);
      if (response !== null) {
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'Create Product Category successfully!',
        });
      } else {
        event.confirm.reject();
      }
    }

  }

  public settings = {
    delete: {
      confirmDelete: true,
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    actions: {
      position: 'right'
    },
    columns: {
      name: {
        title: 'Name',
      }
    },

  };

  ngOnInit() {
    this.getListCategory();
  }

}
