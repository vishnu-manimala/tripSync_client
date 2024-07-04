import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiResponse, sendOtpResponse } from 'src/app/models/api.models';
import { ProfileResponse, followDataModel } from 'src/app/models/profile.model';
import { UsersResponse } from 'src/app/models/users_response.model';
import { AccountService } from 'src/app/services/account.service';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environments';
import { MapComponent } from 'src/app/views/user/publis-rides/map/map.component';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  picUrl:string = environment.picUrl;
  publishedRideCount: string | number = 0;
  userData!: UsersResponse;
  name: string = "";
  propic:boolean =false;
  licence:boolean = false;
  editname: boolean = false;
  IDupload:boolean=false;
  selectedFile: File | null = null;
  selectedIdFiles: File[] = [];
  idname: string = "";
  followData!:followDataModel;
  private _profileSubscription!: Subscription;
  private _editNameSUbscription!: Subscription;
  private _imageSubscription!: Subscription;

  constructor(private _profileService: ProfileService, private _accountService: AccountService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this._profileSubscription = this._profileService.getProfileData().subscribe((result: ProfileResponse) => {
      if (result.status === "Success") {
        this.publishedRideCount = result.ride;
        this.userData = result.data;
        this.name = result.data.name;
        this.followData = result.followData;
      }
    })
  }
  editName() {
    this.editname = !this.editname;
  }

  uploadPic(){
    this.propic = !this.propic;
  }

  uploadID(){
    this.IDupload = !this.IDupload;
  }

  addLicence(){
    this.licence = !this.licence;
  }

  saveName() {
    this._editNameSUbscription = this._accountService.updateName(this.name).subscribe((result: sendOtpResponse) => {
      if (result.status === "Success") {
        this.editname = !this.editname;
        this.userData.name = result.data;
      }
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      this._imageSubscription = this._accountService.saveProfilePhoto(this.selectedFile).subscribe((result: ApiResponse) => {
        if (result.status === "Success") {
          this.propic = !this.propic;
          this.loadData()
        }
      })
    }
  }

  onFileId(event: any) {
    this.selectedIdFiles = event.target.files;
  }

  idName(event: any) {
    this.idname = event.target.value
  }

  onIdSubmit() {
    const formData = new FormData();
    for (let i = 0; i < this.selectedIdFiles.length; i++) {
      formData.append('files', this.selectedIdFiles[i]);
    }
    formData.append('idName', this.idname);
 
    this._imageSubscription = this._accountService.saveIdPhotos(formData).subscribe((result: any) => {
    
      if (result.status === "Success") {
        this.IDupload = !this.IDupload;
        this.loadData()
      }
    })
  }

  onSelectedLicense(event: any) {
    this.selectedIdFiles = event.target.files;
  }

  onLicenseSubmit(){
    const formData = new FormData();
    for (let i = 0; i < this.selectedIdFiles.length; i++) {
      formData.append('files', this.selectedIdFiles[i]);
    }
   
    this._imageSubscription = this._accountService.saveLicensePhotos(formData).subscribe((result: any) => {
      
      if (result.status === "Success") {
        this.licence = !this.licence;
        this.loadData()
      }
    })
  }

  ngOnDestroy(): void {
    if (this._profileSubscription) {
      this._profileSubscription.unsubscribe();
    }
  }
}
