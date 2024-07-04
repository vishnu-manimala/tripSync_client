import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  id: string | null = "";
  constructor(private _route: ActivatedRoute, private _router: Router) {
    this._route.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id);
    })
  }
  viewRide() {
    this._router.navigate(['/user/search/view'], { queryParams: { id: this.id } })
  }
  home() {
    this._router.navigate(['/user'])
  }
}
