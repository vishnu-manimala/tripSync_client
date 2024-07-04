import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showMenu = false;
  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }
  constructor(private _jwt:JwtService, private _router:Router){}

  logout(){
    let loggedOut = this._jwt.discardToken();
    let roleCleared = this._jwt.discardRole();
    console.log(loggedOut,roleCleared)
    if(loggedOut === "success" && roleCleared === 'success'){
      this._router.navigate(['auth']);
    }
  }
}
