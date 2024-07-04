import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponseData, UsersResponse } from 'src/app/models/users_response.model';
import { AccountService } from 'src/app/services/account.service';
import { JwtService } from 'src/app/services/jwt.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  picUrl:string = environment.picUrl;
  isSidebarExpanded = true;
  userData!:UsersResponse;
  // baseUrl:string = 'http://localhost:3001/uploads/';
  profileImage:string = "https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png"
  constructor(private _router: Router, private _jwt: JwtService,private _accountService:AccountService) { }
  ngOnInit(): void {
    this._accountService.getUserData().subscribe((result:UserResponseData)=>{
      if(result.status === "Success"){
        this.userData = result.data;
        if(this.userData.profileImage.length>0){
          this.profileImage = this.picUrl+this.userData.profileImage[this.userData.profileImage.length-1];
          
        }
      }
      console.log(this.profileImage)
    })
  }
  imageUrl: string = '../../../assets/tp.png'
  expandSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
  home() {
    this._router.navigate(['user'])
  }
  navigation(url: string) {
    console.log(url)
    this._router.navigate([url])
  }
  logout() {
    let loggedOut = this._jwt.discardToken();
    let roleCleared = this._jwt.discardRole();
    console.log(loggedOut, roleCleared)
    if (loggedOut === "success" && roleCleared === 'success') {
      this._router.navigate(['']);
    }
  }
  naviagtor(url: string) {
    this._router.navigate([url]);
  }
}
