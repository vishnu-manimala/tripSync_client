import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriptions } from 'razorpay/dist/types/subscriptions';
import { Subscription } from 'rxjs';
import { AdminDataResponse, adminData, monthlyUser } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/admin.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
adminData!:adminData ;
  chartOptions:any;
  chartUser!:monthlyUser[];
 
  private _adminSubscription!:Subscription;
  chartData:any;
  title="users";
  userlabel:string[]=[];
  uservalue:number[]=[]
  chart: any = [];
  chart2: any = []
  constructor(private _admin:AdminService, private _router:Router){}
  ngOnInit(): void {
    this.getAdminData();
   
  }
  getAdminData(){
   this._adminSubscription =  this._admin.getAdminData().subscribe((result:AdminDataResponse)=>{
      if(result.status === "Success"){
        this.adminData = result.data;
        this.chartUser = result.userchart;
        const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
 
        let i=0;
        let userList:any = []
        this.chartUser.forEach(user=>
          {
         
            const list ={
              month:month[user._id-1],
              users:user.count
            }
            userList.push(list)
          
          })
        this.chartData = userList;
     
       
      for (const item of this.chartData) {
        this.userlabel.push(item.month);
        this.uservalue.push(item.users)
      }
    
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.userlabel,
          datasets: [
            {
              label: 'Rides',
              data: this.uservalue,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      this.chart2 = new Chart('canvas1', {
        type: 'pie',
        data: {
          labels: this.userlabel,
          datasets: [
            {
              label: 'Rides',
              data: this.uservalue,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      }
    })  
  }
  navigator(url:string){
    this._router.navigate([url]);
  }
  
  ngOnDestroy(): void {
    if(this._adminSubscription){
      this._adminSubscription.unsubscribe();
    }
  }
  
}
