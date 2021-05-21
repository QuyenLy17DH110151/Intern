import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/api-clients/models/category.model';
import { CategoryClient } from 'src/app/api-clients/category.client';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [CategoryClient]
})
export class CategoryComponent implements OnInit {


  categories: Category[];

  constructor(protected categoryClient: CategoryClient,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router) {


  }

  private getListCategory() {
    this.categoryClient.getListCategory().subscribe(category => {

      this.categories = category.items;
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

    if (window.confirm("Are you sure you want to edit?")) {
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
    else {
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
    edit: {
      confirmSave: this.userService.getTokenInfo().role == 'Admin',
    },
    delete: {
      confirmDelete: this.userService.getTokenInfo().role == 'Admin',
    },
    actions: {
      edit: this.userService.getTokenInfo().role == 'Admin',
      delete: this.userService.getTokenInfo().role == 'Admin',
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
