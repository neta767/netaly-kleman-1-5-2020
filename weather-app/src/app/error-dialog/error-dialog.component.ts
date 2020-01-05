import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ErrorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  onOKClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
