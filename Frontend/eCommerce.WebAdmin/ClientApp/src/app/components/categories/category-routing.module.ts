import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CategoryDetailsComponent } from './details-category/categoryDetails.component';
import { CategoryComponent } from './list-category/category.component';

const routes: Routes = [{
    path: '',
    children: [
        {
            path: 'list-category',
            component: CategoryComponent,
            data: {
                title: 'Category List',
                breadcrumb: 'Category List',
            },
        },
        {
            path: 'create-category',
            component: CreateCategoryComponent,
            data: {
                title: 'Create Category',
                breadcrumb: 'Create Category',
            },
        },
        {
            path: 'details',
            component: CategoryDetailsComponent,
            data: {
                title: 'Category Details',
                breadcrumb: 'Category Details',
            },
        },
    ]



}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoryhRoutingModule { }
