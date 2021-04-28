import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LableOptions } from "src/app/api-clients/models/_index";
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

    constructor(private route: ActivatedRoute, private categoryClient: CategoryClient) {
        this.route.queryParams.subscribe(params => {
            this.id = params['id'];
        });
        this.getData();
    }

    getData() {
        this.categoryClient.getCategoryDetailsById(this.id).subscribe(rs => {
            this.name = rs.name;
            this.properties = rs.lableOptions;
        })
    }

    public settings = {
        actions: {
            delete: false,
            add: false,
            edit: false
        },
        columns: {
            lable: {
                title: 'Lable',
            },
            options: {
                title: 'Options'
            }
        }
    };


    ngOnInit(): void {

    }
}