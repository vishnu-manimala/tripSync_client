import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ReplyModalComponent } from 'src/app/components/reply-modal/reply-modal.component';
import { RideModalComponent } from 'src/app/components/ride-modal/ride-modal.component';
import { Reply, Review, ReviewResponse } from 'src/app/models/review.model';
import { AdminService } from 'src/app/services/admin.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  private _reviewSubscription!:Subscription;
  pages:number = 1;
  page:number = 1;
  pageArray:any;
  reviewData!:Review[];
  constructor(private _reviewService:ReviewService,private _admin:AdminService,private _matDialog:MatDialog){}

  ngOnInit(): void {
    this.getPage();
    this.getData(1);
  }
  getData(page:number){
    this._reviewSubscription = this._reviewService.getReviews(page).subscribe((result:ReviewResponse)=>{
      if(result.status === "Success"){
        this.reviewData = result.data;
      }
    })
  }
  getPage(){
    this._admin.getPages('review').subscribe((res:any)=>{
      this.page = res;
      this.pageArray = new Array(+this.page).fill('X')
    })
  }
  pagination(page:number){
    this.pages = page;
    this.getData(page)
  }
  viewRide(rideId:string){
    this._matDialog.open(RideModalComponent,{
      width: '650px',
      data:rideId
    })
  }
  viewReplys(reply:Reply[]){
    this._matDialog.open(ReplyModalComponent,{
      width: '650px',
      data:reply
    })
  }
  ngOnDestroy(): void {
   if( this._reviewSubscription){
    this._reviewSubscription.unsubscribe();
   }
  }
}
