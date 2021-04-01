import { Component, Input, OnInit } from '@angular/core';
import { categoryDB } from '../../../../shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/shared/service/category.service';
import { Category } from 'src/app/api-clients/models/category.model';
import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {


  category: Category;

  constructor(protected CategoryService: CategoryService) {

    this.getListCategory();
  }

  private getListCategory() {
    this.CategoryService.getListCategory().subscribe(category => {

      this.category = category.items;
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.CategoryService.deleteCategory(event.data.id).subscribe(
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

    this.CategoryService.updateCategory(event.data.id, data).subscribe(
      res => {
        event.confirm.resolve(event.newData);
        this.getListCategory();
      }
    );
  }

  onCreateConfirm(event): void {
    var data = {
      "name": event.newData.name,
    };

    if (window.confirm('Are you sure you want to create?')) {
      this.CategoryService.addCategory(data).subscribe(
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
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
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

  }

}
