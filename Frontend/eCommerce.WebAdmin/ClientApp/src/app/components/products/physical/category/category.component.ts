import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/api-clients/models/category.model';
import { CategoryClient } from 'src/app/api-clients/category.client';

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

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.categoryClient.deleteCategory(event.data.id).subscribe(
        res => {
          event.confirm.resolve(event.newData);
          this.getListCategory();
        }
      )
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    var data = {
      "name": event.newData.name,
    };

    if (window.confirm('Are you sure you want to edit?')) {
      this.categoryClient.updateCategory(event.data.id, data).subscribe(
        res => {
          event.confirm.resolve(event.newData);
          this.getListCategory();
        }
      );
    }
  }

  onCreateConfirm(event): void {
    var data = {
      "name": event.newData.name,
    };

    if (window.confirm('Are you sure you want to create?')) {
      this.categoryClient.addCategory(data).subscribe(
        res => {
          event.confirm.resolve(event.newData);
          this.getListCategory();
        }
      )
    };

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
