import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  picUrl:string = environment.picUrl;
  collapseShow = "hidden";
  constructor(private _router:Router) { }

  ngOnInit() {
  }
  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }
  navigation(url:string){
   this._router.navigate([url]);
  }
}
