import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(public userserivce: UserService, private router: Router) {
  }

  logout() {
    this.userserivce.logout().subscribe(() => {
      this.router.navigateByUrl('create-account');
    })
  }
}
