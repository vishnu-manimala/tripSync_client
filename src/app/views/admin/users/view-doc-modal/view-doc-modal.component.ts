import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { reqIDsData } from 'src/app/models/payment.model';
import { UserResponseData, UsersResponse, userModal } from 'src/app/models/users_response.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-view-doc-modal',
  templateUrl: './view-doc-modal.component.html',
  styleUrls: ['./view-doc-modal.component.css']
})
export class ViewDocModalComponent {
  images!:[];
  verified:boolean|undefined=false;
  user!:UsersResponse;
  baseUrl:string = 'http://localhost:3001/uploads/';
  constructor(@Inject(MAT_DIALOG_DATA) public data:userModal,private _dialog:MatDialog,private _admin:AdminService){}
  
  ngOnInit(): void {
    this.user = this.data.user;
    this.images = this.data.path === 'ID'?this.user.idPhotos:this.user.licencePhotos;
    this.verified = this.data.path === 'ID'?this.user.isIdVerified :this.user.islicenceVerified;
  }

  verify(){
    this._admin.verifyUser(this.data.user._id,this.data.path).subscribe((result:UserResponseData)=>{
      if(result.status === "Success"){
        this.user = result.data;
        this.images = this.data.path === 'ID'?this.user.idPhotos:this.user.licencePhotos;
        this.verified = this.data.path === 'ID'?this.user.isIdVerified :this.user.islicenceVerified;
      }
    })
  }
}
