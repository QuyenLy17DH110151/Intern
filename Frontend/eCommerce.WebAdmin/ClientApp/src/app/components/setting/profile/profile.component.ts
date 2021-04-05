import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {

  // user: UserDetails;
  // @Input() id = 'c593d805-ddd8-4e0d-b22a-5feb129a8478';

  // constructor(protected UserService: UserService) { 
  //   this.GetUserDetail();
  // }

  ngOnInit() { }

  // async GetUserDetail() {
  //   const response = await this.UserService
  //     .getUserDetail(this.id)
  //     .toPromise();
  //   this.user = response;
  // }
}
