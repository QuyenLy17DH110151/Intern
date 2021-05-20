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


  categories: Category[];

  constructor(protected categoryClient: CategoryClient, private toastr: ToastrService, private router: Router) {


  }

  private getListCategory() {
    this.categoryClient.getListCategory().subscribe(category => {

      this.categories = category.items;
    });
  }

  onDeleteConfirm(event) {
    this.categoryClient.deleteCategory(event.data.id).subscribe(() => {
      this.toastr.success('Change Category Success!', 'Notification');
      this.getListCategory();
    })
  }

  onEditConfirm(event): void {

    console.log(event);

    this.categories.map(category => {
      if (category.id == event.data.id) {
        category.name = event.newData.name;
        this.categoryClient.updateCategory(category).subscribe(() => {
          this.toastr.success('Change Category Success!', 'Notification');
          this.getListCategory();
          return;
        })
      }
    })


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
