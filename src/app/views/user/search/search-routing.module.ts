import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';
import { ViewSearchComponent } from './view-search/view-search.component';
import { ChatComponent } from './chat/chat.component';
import { SuccessComponent } from 'src/app/components/success/success.component';

const routes: Routes = [
  {path:'',component:SearchComponent},
  {path:'view',component:ViewSearchComponent},
  {path:'success',component:SuccessComponent},
  {path:'chat',component:ChatComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
