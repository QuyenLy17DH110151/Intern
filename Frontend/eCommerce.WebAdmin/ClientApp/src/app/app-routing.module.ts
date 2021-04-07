import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { content } from './shared/routes/content-routes';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';

const routes: Routes = [
    {
        path: '',
        // redirectTo: 'dashboard/default',
        redirectTo: 'auth/login',
        pathMatch: 'full',
    },
    {
        path: '',
        component: ContentLayoutComponent,
        children: content,
    },
    {
        path: 'auth/login',
        component: LoginComponent,
    },
    {
        path: 'auth/reset-password',
        component: ResetPasswordComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            relativeLinkResolution: 'legacy',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
