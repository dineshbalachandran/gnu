import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfigItemListPickerComponent } from '../../../config-item/config-item-list-picker/config-item-list-picker.component';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss']
})
export class PackageDetailsComponent implements OnInit, OnDestroy {
  
  packageForm: FormGroup;
  no: number;
  private storeSub: Subscription;

  constructor(private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private dialog: MatDialog,
    private store: Store<fromApp.State>) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.no = + params['no'];
          this.initForm();
        }
      )
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  initForm() {
    this.storeSub = this.store.select('package').pipe(
      map(packageState => {
        return packageState.packages.find((_package, i) => {
          return this.no === _package.no;
        });
      })
    ).subscribe(_package => {
      let committedOn = _package.committedOn ? _package.committedOn.toLocaleDateString() : '';

      this.packageForm = this.fb.group({
        createdBy: [{value: _package.createdBy, disabled: true}],
        status: [{value: _package.status, disabled: true}],
        source: [{value: _package.source, disabled: true}],
        committedBy: [{value: _package.committedBy, disabled: true}],
        committedOn: [{value: committedOn, disabled: true}],
        description: [_package.description, Validators.required],
       });
    });    
  }

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
    let dialogRef = this.dialog.open(ConfigItemListPickerComponent, {data});
    dialogRef.afterClosed().subscribe(result => {console.log(result);})
  }
  
  private navigate() {
    this.router.navigate(['../'],{relativeTo: this.route});
  }
}
