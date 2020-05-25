import { Component, OnInit, Inject } from '@angular/core';
import { Package } from '../../../shared/model/package.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-package-create',
  templateUrl: './package-create.component.html',
  styleUrls: ['./package-create.component.scss']
})
export class PackageCreateComponent implements OnInit {

  data = {save: false, no: '', description: ''};

  constructor(public dialogRef: MatDialogRef<PackageCreateComponent>) { }

  ngOnInit(): void {}

  onSave() {
    this.data.save = true;
    this.dialogRef.close(this.data);
  }

  onCancel() {
    this.dialogRef.close(this.data);
  }
}
