import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryClient } from 'src/app/api-clients/category.client';
import { CreateCategoryRequest, LableOptions } from 'src/app/api-clients/models/category.model';

@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.scss'],
    providers: [CategoryClient]
})
export class CreateCategoryComponent implements OnInit {
    public generalForm: FormGroup;
    public properties = [];
    public event: any = null;
    public settings;
    public isStart: boolean = false;

    constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private categoryClient: CategoryClient) {
        this.createForm();
        this.settings = this.sourceSettings;
    }

    get formValidators() {
        return this.generalForm.controls;
    }

    createForm() {
        this.generalForm = this.formBuilder.group({
            name: ['', [Validators.required]]
        });
    }

    ngOnInit() {
    }

    sourceSettings = {
        delete: {
            confirmDelete: true,
        },
        add: {
            confirmCreate: true,
        },
        edit: {
            confirmSave: true,
        },
        actions: {
            position: 'left'
        },
        columns: {
            lable: {
                title: 'Lable',
            },
            options: {
                title: 'Options',
            }
        },

    };

    onCreateConfirm(e): void {
        if (this.event != null && this.event.source.data.length >= 5) {
            this.toastr.error('Property can not more 5', 'Erro');
            return;
        }
        e.confirm.resolve(e.newData);
        this.event = e;
    }

    onEditConfirm(e): void {
        e.confirm.resolve(e.newData);
        this.event = e;
    }

    onDeleteConfirm(e): void {
        e.confirm.resolve(e.newData);
        this.event = e;
    }

    onSave() {
        this.isStart = true;
        let properties: LableOptions[] = this.event.source.data;
        if (!this.generalForm.invalid) {
            let createCategoryRequest = new CreateCategoryRequest(this.generalForm.value.name, properties);
            this.categoryClient.addCategory(createCategoryRequest).subscribe(() => {
                this.toastr.success('Create category success', 'Notification');
                this.isStart = false;
                this.properties = [];
                this.settings = this.sourceSettings;
                this.createForm();
                this.event = null;
            })
        }
    }
}
