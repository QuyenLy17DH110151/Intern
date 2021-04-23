import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'header-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchForm: FormGroup;
  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      term: ""
    });
  }

 
  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    item.active = !item.active;
  }

}
