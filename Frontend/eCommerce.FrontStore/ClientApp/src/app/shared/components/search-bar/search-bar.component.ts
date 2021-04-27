import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { NavService, Menu } from "../../services/nav.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "header-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent implements OnInit {
  searchForm: FormGroup;

  @ViewChild("searchTerm") searchTerm: ElementRef;
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      term: "",
    });
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    item.active = !item.active;
  }
  onClick() {
    console.log("search Term", this.searchTerm.nativeElement.value);
    this.router.navigate(["/shop/collection/left/sidebar"], {
      queryParams: { searchTerm: this.searchTerm.nativeElement.value },
    });
    this.searchTerm.nativeElement.value = "";
  }
  onKeydown() {
    this.onClick();
    // let input = (document.getElementById("searchTerm") as HTMLInputElement)
    //   .value;
    // this.router.navigate([
    //   "/shop/collection/left/sidebar",
    //   { searchTerm: input },
    // ]);
    // (document.getElementById("searchTerm") as HTMLInputElement).value = "";
  }
}
