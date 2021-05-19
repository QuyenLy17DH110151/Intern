import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Category, LableOptions } from "src/app/api-clients/models/_index";
import { CategoryClient } from "src/app/api-clients/_index";

@Component({
    selector: 'app-category-details',
    templateUrl: './categoryDetails.component.html',
    styleUrls: ['./categoryDetails.component.scss'],
    providers: [CategoryClient]
})

export class CategoryDetailsComponent implements OnInit {

    public id: string = "";

    public properties: LableOptions[] = [];

    public name: string = "";

    constructor(private toastr: ToastrService, private route: ActivatedRoute, private categoryClient: CategoryClient) {

        this.id = this.route.snapshot.paramMap.get('categoryId');
        this.getData();
    }

    getData() {
        this.categoryClient.getCategoryDetailsById(this.id).subscribe(rs => {
            this.name = rs.name;
            this.properties = rs.lableOptions;
        })
    }

    public settings = {
        delete: {
            confirmDelete: true,
        },
        add: {
            confirmCreate: true,
        },
        edit: {
            confirmSave: true,
        },
        columns: {
            lable: {
                title: 'Label',
            },
            options: {
                title: 'Options'
            }
        }
    };


    ngOnInit(): void {

    }

    onCreateConfirm(e): void {
        if (this.properties.length >= 5) {
            this.toastr.error('Property can not more 5', 'Erro');
            return;
        }
        e.confirm.resolve(e.newData);
        this.properties.push(e.newData);
        this.updateCategory();
    }

    onEditConfirm(e): void {
        e.confirm.resolve(e.newData);
        let i = 0;
        this.properties.map(value => {
            if (value.lable == e.data.lable && value.options == e.data.options) {
                this.properties.splice(i, 1);
            }
            i++;
        });
        this.properties.push(e.newData);
        this.updateCategory();
    }

    onDeleteConfirm(e): void {
        e.confirm.resolve(e.newData);
        let i = 0;
        this.properties.map(value => {
            if (value.lable == e.data.lable && value.options == e.data.options) {
                this.properties.splice(i, 1);
            }
            i++;
        });
        this.updateCategory();
    }

    updateCategory() {
        let category: Category = new Category(this.id, this.name, this.properties);
        this.categoryClient.updateCategory(category).subscribe(() => {
            this.toastr.success('Change Category Success!', 'Notification');
            this.getData();
        });
    }
}