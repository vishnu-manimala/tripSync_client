import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RideSearchResponse, searchResult, singleRIdeResponse } from 'src/app/models/ride.model';
import { RideService } from 'src/app/services/ride.service';
import { SearchService } from 'src/app/services/search.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { UsersResponse } from 'src/app/models/users_response.model';
import { Review } from 'src/app/models/review.model';
import { JwtService } from 'src/app/services/jwt.service';
import { ApiResponse } from 'src/app/models/api.models';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-view-search',
  templateUrl: './view-search.component.html',
  styleUrls: ['./view-search.component.css']
})
export class ViewSearchComponent {
  picUrl: string = environment.picUrl;
  id: string | null = "";
  private _rideSubscription!: Subscription;
  private _requestSubscription!: Subscription;
  searchData!: searchResult[];
  err: string = "";
  requestStatus: string = "";
  requested: boolean = false;
  requestId: string = "";
  userId: string = "";
  review: string = "";
  reply: string = "";
  reviewSection: boolean = false;
  reviewData: Review[] = [];
  userdata: any;

  replySection: string = "";
  constructor(
    private _route: ActivatedRoute,
    private _rideService: RideService,
    private _searchService: SearchService,
    private _router: Router,
    private _matDialog: MatDialog,
    private _jwt: JwtService
  ) { }
  ngOnInit(): void {
    this._route.queryParamMap.subscribe(params => {
      this.id = params.get('id');

    })
    this.getData(this.id);
    const data: any = localStorage.getItem('state');
    this.userId = JSON.parse(data)._id;
    this.userdata = JSON.parse(data)
  }

  getData(id: string | null) {
    this._rideSubscription = this._rideService.getSearchData(id).subscribe((result: singleRIdeResponse) => {
      if (result.status === "Success") {
        this.searchData = result.data;
        this.reviewData = result.review;
        const rideRequestArray = this.searchData[0].rideRequest;
        rideRequestArray?.find(ride => {
          if (ride.userId === this.userId) {
            this.requested = true;
            this.requestStatus = ride.status;
            this.requestId = ride._id;
          }
        })
      } else {
        this.err = result.message;
        this.searchData = [];
      }
    })
  }

  chat(name: string, email: string, userId: string, image: string) {
    this._router.navigate(['/user/search/chat'], { queryParams: { name: name, email: email, userId: userId, image: image } })
  }

  navigator(id: string) {
    this._router.navigate(['/user/profile'], { queryParams: { id: id } })
  }

  cancelRequest(rideId: string, userId: string, action: string) {
    this._requestSubscription = this._searchService.cancelRideRequest(rideId, userId, this.requestId, action).subscribe((result: any) => {
      if (result.status === "Success") {
        this.requested = false;
        this.requestStatus = "";
        this.requestId = "";
        this.getData(this.id);
      }
    })
  }
  requestRide(rideId: string, userId: string) {

    this._requestSubscription = this._searchService.request(rideId, userId, this.requestId).subscribe((result: any) => {
      if (result.status === "Success") {
        this.getData(this.id);
      }
    })
  }
  saveReview(rideId: string, userId: string) {

    this._searchService.saveReview(rideId, userId, this.review).subscribe((result: any) => {
      console.log(result)
      this.review = "";
      this.getData(this.id);
    })
  }
  saveReply(reviewId: string, userId: string) {

    this._searchService.saveReply(reviewId, userId, this.reply).subscribe((result: any) => {

      this.reply = "";
      this.getData(this.id);
    })
  }
  payNow(rideID: string, userId: string, requestId: string) {
    this._matDialog.open(PaymentModalComponent, {
      width: '450px',
      data: {
        rideID: requestId,
        userId: userId,

      }
    })
  }

  loadReview(rideId: string) {
    this.reviewSection = true;
  }

  reviewLike(userId: string, reviewId: string) {
    this._searchService.saveReviewLike(userId, reviewId).subscribe((result: ApiResponse) => {
      if (result.status === 'Success') {
        this.getData(this.id);
      }
    })
  }

  replyLike(userId: string, replyId: string) {
    this._searchService.saveReplyLike(userId, replyId).subscribe((result: ApiResponse) => {
      if (result.status === 'Success') {
        this.getData(this.id);
      }
    })
  }

  replyView(reviewId: string) {
    this.replySection = reviewId;
  }

  deleteReply(replyId: string) {
    this._searchService.deleteReply(replyId).subscribe((result: ApiResponse) => {
      if (result.status === 'Success') {
        this.getData(this.id);
      }
    })
  }

  deleteReview(reviewId: string) {
    this._searchService.deleteReview(reviewId).subscribe((result: ApiResponse) => {
      if (result.status === 'Success') {

        this.getData(this.id);
      }
    })
  }

  likeRide(id: string, userId: string) {
    this._searchService.rideLikes(id, userId).subscribe((result: ApiResponse) => {
      if (result.status === 'Success') {
        this.getData(this.id);
      }
    })
  }
}
