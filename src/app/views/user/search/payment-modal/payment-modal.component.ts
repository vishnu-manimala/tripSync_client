import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorModalComponent } from 'src/app/components/error-modal/error-modal.component';
import { ApiResponse } from 'src/app/models/api.models';
import { RzpResponse, reqIDsData } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import { WindowRefService } from 'src/app/services/window-ref.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent {
  amount!:number;
  error:boolean =false;
  paymentError:boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data:reqIDsData,private _dialog:MatDialog,
  private _razorpayService:PaymentService,private _matDialog:MatDialog,private _router:Router,
  private dialogRef: MatDialogRef<PaymentModalComponent>){}
  ngOnInit(): void { }

  createOrderAndProcessPayment() {
   if(!this.amount){
    this.error=true
    return;
   }

   this._razorpayService.payFare(this.amount,this.data.rideID).subscribe((result:RzpResponse)=>{
   
    if(result.status ==="Success"){
    
      const options: any = {
        key: environment.razorpayKey,
        amount: this.amount * 100, 
        currency: 'INR',
        name: 'TRIP SYNC', 
        description: '', 
        image: '../../../../../assets/TripSync.png', 
        order_id: result.data, 
        modal: {
       
          escape: false,
        },
        notes: {
         
        },
        theme: {
          color: '#67E8F9',
        },
      };
      options.handler = (response: any, error: any) => {
        options.response = response;
        if (error) {
          
          this._matDialog.open(ErrorModalComponent,{
            width: '450px',
          })
        } else {
          
          this._razorpayService
            .savePayment(response, this.data,this.amount)
            .subscribe((result: ApiResponse) => {
              if(result.status === "Success"){
                this.dialogRef.close();
                this._router.navigate(['/user/search/success'],{ queryParams: { id: this.data.rideID } })
              }
            });
        }
             };
      options.modal.ondismiss = () => {
      
       
      };
      const rzp = new this._razorpayService.nativeWindow.Razorpay(options);
      rzp.open();
    }
   })
}
}
