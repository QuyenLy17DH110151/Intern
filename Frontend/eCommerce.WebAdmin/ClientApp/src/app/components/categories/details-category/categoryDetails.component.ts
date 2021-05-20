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
        let p: LableOptions[] = this.properties;
        if (this.properties.length >= 5) {
            this.toastr.error('Property can not more 5', 'Erro');
            return;
        }


        p.push(e.newData);


        this.updateCategory(p, e);

    }

    onEditConfirm(e): void {

        let i = 0;
        let p: LableOptions[] = this.properties;
        p.map(value => {
            if (value.lable == e.data.lable && value.options == e.data.options) {
                this.properties.splice(i, 1);
            }
            i++;
        });
        p.push(e.newData);
        this.updateCategory(p, e);
    }

    onDeleteConfirm(e): void {

        let i = 0;
        let p: LableOptions[] = this.properties;
        p.map(value => {
            if (value.lable == e.data.lable && value.options == e.data.options) {
                this.properties.splice(i, 1);
            }
            i++;
        });
        this.updateCategory(p, e);
    }

    updateCategory(p: LableOptions[], e: any) {
        let category: Category = new Category(this.id, this.name, p);
        this.categoryClient.updateCategory(category).subscribe(() => {
            e.confirm.resolve(e.newData);
            this.getData();
            this.toastr.success('Change Category Success!', 'Notification');

        });
    }
}