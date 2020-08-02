import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {CurrentUserModel} from '../../model/CurrentUserModel';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent implements OnInit {

  currentUser: CurrentUserModel;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

  onLogout() {
    this.authService.logout();
  }
}
