import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRole } from 'src/app/api-clients/models/user.model';
import { AuthGuard } from 'src/app/auth.guard';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CategoryDetailsComponent } from './details-category/categoryDetails.component';
import { CategoryComponent } from './list-category/category.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-category',
                component: CategoryComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Category List',
                    breadcrumb: 'Category List',
                    expectedRole: UserRole.Admin,
                },
            },
            {
                path: 'create-category',
                component: CreateCategoryComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Create Category',
                    breadcrumb: 'Create Category',
                    expectedRole: UserRole.Admin,
                },
            },
            {
                path: 'details/:categoryId',
                component: CategoryDetailsComponent,
                data: {
                    title: 'Category Details',
                    breadcrumb: 'Category Details',
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoryhRoutingModule {}
