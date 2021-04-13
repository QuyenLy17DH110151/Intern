import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { RoleGuardService } from 'src/app/shared/service/RoleGuard.service';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-user',
                component: ListUserComponent,
                data: {
                    title: 'User List',
                    breadcrumb: 'User List',
                },
            },
            {
                path: 'create-user',
                component: CreateUserComponent,
                canActivate: [RoleGuardService],
                data: {
                    expectedRole: 'admin',
                    title: 'Create User',
                    breadcrumb: 'Create User',
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule {}
