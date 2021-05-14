import { UserClient } from 'src/app/api-clients/user.client';
import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavService, Menu } from '../../service/nav.service';
import { TokenInfo } from 'src/app/api-clients/models/common.model';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
    public menuItems: Menu[];
    public url: any;
    public fileurl: any;
    user: TokenInfo;
    public urlAvatar: string;
    public defaultUrlAvata = 'assets/images/dashboard/designer.jpg';
    // userName: string = localStorage.getItem('userName');
    // role: string = localStorage.getItem('userRole');
    constructor(private router: Router, public navServices: NavService, private userService: UserService) {
        this.userService.getUrlAvatarObs().subscribe(rs => {

            setTimeout(() => {
                this.urlAvatar = this.userService.getUrlAvatar();
                console.log(this.urlAvatar);
            }, 2000);

        });

    }
    ngOnInit(): void {
        this.loadUser();
        this.navServices.items.subscribe((menuItems) => {
            this.checkRole(menuItems);
        });
    }

    checkRole(menuItems) {
        if (this.user.role === 'Admin') {
            this.loadMenu(menuItems);
        } else {
            menuItems.splice(1, 1);
            this.loadMenu(menuItems);
        }
    }

    loadMenu(menuItems) {
        this.menuItems = menuItems;
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                menuItems.filter((items) => {
                    if (items.path === event.url) this.setNavActive(items);
                    if (!items.children) return false;
                    items.children.filter((subItems) => {
                        if (subItems.path === event.url)
                            this.setNavActive(subItems);
                        if (!subItems.children) return false;
                        subItems.children.filter((subSubItems) => {
                            if (subSubItems.path === event.url)
                                this.setNavActive(subSubItems);
                        });
                    });
                });
            }
        });
    }

    // Active Nave state
    setNavActive(item) {
        this.menuItems.filter((menuItem) => {
            if (menuItem != item) menuItem.active = false;
            if (menuItem.children && menuItem.children.includes(item))
                menuItem.active = true;
            if (menuItem.children) {
                menuItem.children.filter((submenuItems) => {
                    if (
                        submenuItems.children &&
                        submenuItems.children.includes(item)
                    ) {
                        menuItem.active = true;
                        submenuItems.active = true;
                    }
                });
            }
        });
    }

    // Click Toggle menu
    toggletNavActive(item) {
        if (!item.active) {
            this.menuItems.forEach((a) => {
                if (this.menuItems.includes(item)) a.active = false;
                if (!a.children) return false;
                a.children.forEach((b) => {
                    if (a.children.includes(item)) {
                        b.active = false;
                    }
                });
            });
        }
        item.active = !item.active;
    }

    //Fileupload
    readUrl(event: any) {
        if (event.target.files.length === 0) return;
        //Image upload validation
        var mimeType = event.target.files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        // Image upload
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
            this.url = reader.result;
        };
    }

    //loadUser
    loadUser() {
        console.log('user', JSON.parse(localStorage.getItem('token_info')));
        this.user = JSON.parse(localStorage.getItem('token_info'));
    }
}
