import { SearchRequest } from './../../../api-clients/models/common.model';
import { UserClient } from './../../../api-clients/user.client';
import { Component, OnInit } from '@angular/core';
import { userListDB } from 'src/app/shared/tables/list-users';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
    public user_list = [];
    rq: SearchRequest = {};
    keyWordSearch: string = '';
    constructor(private userClient: UserClient) {
        // this.user_list = userListDB.list_user;
    }

    public settings = {
        delete: {
            confirmDelete: true,
        },
        edit: {
            confirmSave: true,
        },
        actions: {
            custom: [
                {
                    name: 'Button',
                    title: 'Button ',
                },
            ],
        },
        columns: {
            username: {
                title: 'First Name',
                type: 'email',
            },
            firstName: {
                title: 'Last Name',
            },
            lastName: {
                title: 'Email',
            },
            lockoutEnd: {
                title: 'Lockout End',
                editor: {
                    type: 'list',
                    config: {
                        selectText: 'Select',
                        list: [
                            { value: '1', title: 'True' },
                            { value: '', title: 'False' },
                        ],
                    },
                },
            },
            createdDate: {
                title: 'Created Date',
            },
            createdBy: {
                title: 'Created By',
            },
            lastUpdated: {
                title: 'Last Updated',
            },
            lastUpdatedBy: {
                title: 'Last Updated By',
            },
            role: {
                title: 'Role',
            },
        },
    };

    ngOnInit() {
        this.loadData();
    }

    async loadData() {
        let users = await this.userClient.searchUsers(this.rq).toPromise();
        console.log('Users', users);
        this.user_list = users.items;
    }
    onDeleteConfirm(event) {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }
    onSaveConfirm(event) {
        if (window.confirm('Are you sure you want to save?')) {
            console.log(event);
            event.confirm.resolve(event.newData);
            console.log(event.newData.id);
            console.log(event.newData.lockoutEnd);
            if (event.newData.lockoutEnd) {
                this.LockoutUser(event.newData.id);
            } else {
                this.UnlockoutUser(event.newData.id);
            }
            this.loadData();
        } else {
            event.confirm.reject();
        }
    }
    isLockout() {
        this.rq.isLockout = 'true';
        this.loadData();
        console.log('lock');
    }
    isUnLockout() {
        delete this.rq.isLockout;
        this.loadData();
        console.log('Unlock');
    }
    async Search(keyWordSearch) {
        this.rq.searchTerm = keyWordSearch;
        this.loadData();
        this.keyWordSearch = '';
    }
    async LockoutUser(id: string) {
        await this.userClient
            .lockoutUser(id)
            .toPromise()
            .then(() => this.loadData());
    }
    async UnlockoutUser(id: string) {
        await this.userClient
            .unlockoutUser(id)
            .toPromise()
            .then(() => this.loadData());
    }
}
