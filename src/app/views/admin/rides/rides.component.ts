import { Component } from '@angular/core';
import { ApiResponse } from 'src/app/models/api.models';
import { Ride, RideApiResponse } from 'src/app/models/ride.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent {
  ridedata!:Ride[];
  pages:number = 1;
  page:number = 1;
  pageArray:any;

constructor(private _adminService:AdminService){}
ngOnInit(): void {
  this.getPage()
  this.getRides(1);
  
}

getRides(page:number){
  this._adminService.getRideList(page).subscribe((result:RideApiResponse)=>{
    if(result.status === "Success"){
      this.ridedata = result.data;
    }
  })
}
block(id:string){
  this._adminService.block(id).subscribe((result:ApiResponse)=>{
    if(result.status === "Success"){
      this.getRides(this.pages);
    }
  })
}
unblock(id:string){
  this._adminService.unblock(id).subscribe((result:ApiResponse)=>{
    if(result.status === "Success"){
      this.getRides(this.pages);
    }
  })
}

pagination(page:number){
  this.pages = page;
  this.getRides(page)
}
getPage(){
  this._adminService.getPages('ride').subscribe((res:any)=>{
    this.page = res;
    this.pageArray = new Array(+this.page).fill('X')
  })
}
}
