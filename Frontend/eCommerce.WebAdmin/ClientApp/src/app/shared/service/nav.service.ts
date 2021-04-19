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
			path: '/dashboard/default', title: 'Dashboard', icon: 'home', type: 'link', badgeType: 'primary', active: true
		},
		{
			title: 'Users', icon: 'user-plus', type: 'sub', active: false, children: [
				{ path: '/users/list-user', title: 'User List', type: 'link' },
				{ path: '/users/create-user', title: 'Create User', type: 'link' }
			]
		},
		{
			title: 'Products', icon: 'box', type: 'sub', active: false, children: [
				{ path: '/products/list-product', title: 'Product List', type: 'link' },
				{ path: '/products/category', title: 'Category', type: 'link' },
				{ path: '/products/add-product', title: 'Add Product', type: 'link' },
				//{ path: '/products/product-detail/123', title: 'Details Product', type: 'link' },
			]
		},
		{
			title: 'Inventory', path: '/inventory', icon: 'box', type: 'link', active: false
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
