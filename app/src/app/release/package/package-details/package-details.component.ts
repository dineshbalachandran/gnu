import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfigItemListPickerComponent } from 'src/app/config-item/config-item-list-picker/config-item-list-picker.component';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss']
})
export class PackageDetailsComponent {
  packageForm = this.fb.group({
     description: ['Package for matterhorn release', Validators.required],
    });

  constructor(private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private dialog: MatDialog) {}

  onSubmit() {
    alert('Thanks!');
    this.navigate();
  }

  onCancel() {
    this.navigate();
  }

  onAdd() {
    this.openDialog({title: 'Add items', action: 'Add'})    
  }

  onRemove() {
    this.openDialog({title: 'Remove items', action: 'Remove'})
  }

  private openDialog(data: {title: string, action: string}) {
    let dialogRef = this.dialog.open(ConfigItemListPickerComponent, {
      data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }
  
  private navigate() {
    this.router.navigate(['../'],{relativeTo: this.route});
  }
}
