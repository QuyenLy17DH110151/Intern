import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/api-clients/models/category.model';
import { CategoryClient } from 'src/app/api-clients/category.client';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [CategoryClient]
})
export class CategoryComponent implements OnInit {


  category: Category;

  constructor(protected categoryClient: CategoryClient, private toastr: ToastrService, private router: Router) {


  }

  private getListCategory() {
    this.categoryClient.getListCategory().subscribe(category => {

      this.category = category.items;
    });
  }

  onDeleteConfirm(event) {
    if (window.confirm("Are you sure you want to delete?")) {
      this.categoryClient.deleteCategory(event.data.id).subscribe(() => {
        this.toastr.success('Change Category Success!', 'Notification');
        this.getListCategory();
      })
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    var data = {
      "name": event.newData.name,
    };

    if (window.confirm("Are you sure you want to edit?")) {
      this.categoryClient.updateCategory(event.data.id, data).subscribe(() => {
        this.toastr.success('Change Category Success!', 'Notification');
        this.getListCategory();
      })
    } else {
      event.confirm.reject();
    }
  }

  onCategoryRowSelected(event) {
    let categoryId = event.data.id;
    this.router.navigate(['/categories/details', categoryId]);
  }



  public settings = {
    pager: {
      display: true,
      perPage: 5,
    },
    delete: {
      confirmDelete: true,
    },

    edit: {
      confirmSave: true,
    },
    actions: {
      add: false,
      position: 'left'
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
