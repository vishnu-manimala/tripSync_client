import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/models/api.models';
import { UsersResponse, UsersResponseData } from 'src/app/models/users_response.model';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import { ViewDocModalComponent } from './view-doc-modal/view-doc-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  userList: any;
  usersResponse!: UsersResponseData;
  usersData!: UsersResponse[];
  pages:number = 1;
  page:number = 1;
  pageArray:any;
  private _userSubscription!: Subscription;
  private _blockUserSubscription!:Subscription;
  private  _verifyUserSubscription!:Subscription;
  private _unblockUserSubscription!:Subscription;

  constructor(private _userService: UserService, private _toastr:ToastrService,private _admin:AdminService,private _matDialog:MatDialog) { }

  ngOnInit(): void {
    this.getPage()
    this.getAllUsersData(1)

  }
  getAllUsersData(page:number) {
   
    this._userSubscription = this._userService.getAllUsers(page).subscribe((result: UsersResponseData) => {
      this.usersResponse = result;
      this.usersData = this.usersResponse.data;
    })
  }
  blockUser(id: string) {
    this._blockUserSubscription = this._userService.blockUser(id).subscribe((result:ApiResponse)=>{
      if(result.status === 'Success'){
        this.getAllUsersData(this.pages);
      }else{
        this._toastr.error(result.message);
      }
    })
  }
  verifyUser(id: string) {
    this._verifyUserSubscription = this._userService.verifyUser(id).subscribe((result:ApiResponse)=>{
      if(result.status === 'Success'){
        this.getAllUsersData(this.pages);
      }else{
        this._toastr.error(result.message);
      }
    })
  }
  unblockUser(id: string) {
    this._unblockUserSubscription = this._userService.unBlockUser(id).subscribe((result:ApiResponse)=>{
      if(result.status === 'Success'){
        this.getAllUsersData(this.pages);
        
      }else{
        this._toastr.error(result.message);
      }
    })
  }
  pagination(page:number){
    this.pages = page;
    this.getAllUsersData(page)
  }
  getPage(){
    this._admin.getPages('user').subscribe((res:any)=>{
      this.page = res;
      this.pageArray = new Array(+this.page).fill('X')
    })
  }

  viewAndVerify(user:UsersResponse,path:string){
    this._matDialog.open(ViewDocModalComponent,{
      width: '750px',
      data:{
        user:user,
        path:path
      }
    })
  }
  ngOnDestroy(): void {
    
    if (this._userSubscription) {
      this._userSubscription.unsubscribe();
    }
    if(this._blockUserSubscription){
      this._blockUserSubscription.unsubscribe();
    }
    if (this._verifyUserSubscription) {
      this._verifyUserSubscription.unsubscribe();
    }
    if(this._unblockUserSubscription){
      this._unblockUserSubscription.unsubscribe();
    }
  }
}
