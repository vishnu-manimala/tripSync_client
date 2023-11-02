import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  isSidebarExpanded = true;
 constructor(private _router:Router){}

  expandSidebar(){
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
  home(){
    this._router.navigate(['user'])
  }
  
}
