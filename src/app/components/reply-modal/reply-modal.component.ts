import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Reply } from 'src/app/models/review.model';

@Component({
  selector: 'app-reply-modal',
  templateUrl: './reply-modal.component.html',
  styleUrls: ['./reply-modal.component.css']
})
export class ReplyModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:Reply[],
  private _dialog:MatDialog){}
}
