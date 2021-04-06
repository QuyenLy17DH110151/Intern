import { Component, Input, OnInit } from '@angular/core';
import { UserClient } from 'src/app/api-clients/_index';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {

  constructor(private userClient: UserClient) {
  }

  async resetPassword() {
    this.userClient.resetPassword().subscribe((res) => {
      alert('Reset Password Success');
    });
  }

  ngOnInit() { }

}
