import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  isSidebarExpanded = true;
 constructor(private _router:Router, private _jwt:JwtService){}
imageUrl:string = '../../../assets/tp.png'
  expandSidebar(){
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
  home(){
    this._router.navigate(['user'])
  }
 navigation(url:string){
  console.log(url)
  this._router.navigate([url])
 }
 logout(){
  let loggedOut = this._jwt.discardToken();
  let roleCleared = this._jwt.discardRole();
  console.log(loggedOut,roleCleared)
  if(loggedOut === "success" && roleCleared === 'success'){
    this._router.navigate(['auth']);
  }
}
}
