import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { WINDOW } from "./windows.service";
// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false

	constructor(@Inject(WINDOW) private window) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener("window:resize", ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			title: 'Login',path: '/auth/login', icon: 'log-in', type: 'link', active: false
		},
		{
			title: 'Reset password',path: '/auth/reset-password', icon: 'settings', type: 'link', active: false
		},
		{
			title: 'Users', icon: 'user-plus', type: 'sub', active: false, children: [
				{ path: '/users/list-user', title: 'User List', type: 'link' },
				{ path: '/users/create-user', title: 'Create User', type: 'link' },
				{ path: '/users/lockout-user', title: 'Lockout User', type: 'link' },
			]
		},
		{
			title: 'Products', icon: 'box', type: 'sub', active: false, children: [
				{ path: '/products/list-product', title: 'Product List', type: 'link' },
				{ path: '/products/list-product-category', title: 'Product Categori List', type: 'link' },
				{ path: '/products/create-product', title: 'Create Product', type: 'link' },
				{ path: '/products/details-product', title: 'Details Product', type: 'link' },
			]
		},
		{
			title: 'Inventory',path: '/inventory', icon: 'box', type: 'link', active: false
		},
		{
			title: 'Order', icon: 'box', type: 'sub', active: false, children: [
				{ path: '/order/list-order', title: 'Order List', type: 'link' },
				{ path: '/order/details-order', title: 'Order Details', type: 'link' },
				{ path: '/order/status-order', title: 'Order Status', type: 'link' },
			]
		},
	]
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
