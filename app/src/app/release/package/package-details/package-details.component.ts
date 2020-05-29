import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Package } from '../../../shared/model/package.model';
import * as fromApp from '../../../store/app.reducer';
import * as PackageActions from '../store/package.actions';
import { ConfigItem } from '../../../shared/model/config-item.model';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss']
})
export class PackageDetailsComponent implements OnInit, OnDestroy {
  
  packageForm: FormGroup;
  
  private storeSub: Subscription;
  
  isCommitted = false;
  itemsUpdated = false;
  packageNo: string;
  
  _package: Package;
  packedItems: ConfigItem[];
  unpackedItems: ConfigItem[];

  private itemsUpdateSub : Subscription;

  constructor(private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private dialog: MatDialog,
    private store: Store<fromApp.State>) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.packageNo = params['no'];
          this.initForm();
        }
      )
  }
  
  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  initForm() {
    this.storeSub = this.store.select('package').pipe(
      map(packageState => ({
        package : packageState.packages.find((_package, i) => this.packageNo === _package.no),
        packedItems: packageState.configItems.get(this.packageNo),
        unpackedItems: packageState.configItems.get('')
      }))
    ).subscribe(data => {
      this._package = {...data.package};
      this.packedItems = [...data.packedItems];
      this.unpackedItems = [...data.unpackedItems];

      let committedOn = this._package.committedOn ? this._package.committedOn.toDateString() : '';

      this.isCommitted = this._package.status === 'Committed';

      this.packageForm = this.fb.group({
        createdBy: [{value: this._package.createdBy, disabled: true}],
        status: [{value: this._package.status, disabled: true}],
        source: [{value: this._package.source, disabled: true}],
        committedBy: [{value: this._package.committedBy, disabled: true}],
        committedOn: [{value: committedOn, disabled: true}],
        description: [{value: this._package.description, disabled: this.isCommitted}, Validators.required],
      });
    });    
  }

  onSubmit() {
    let _package : Package = this.packageForm.value;
    this._package.description = _package.description;
    
    //TODO: call save package instead
    this.store.dispatch(PackageActions.updatePackage({package: this._package}));
    if (this.itemsUpdated) {
      this.store.dispatch(PackageActions.repackConfigItems({packageNo: this._package.no, configItems: this.packedItems}));
      this.store.dispatch(PackageActions.repackConfigItems({packageNo: '', configItems: this.unpackedItems}))
    }

    alert('Thanks!');
    this.navigate();
  }

  onCommit() {    
    this._package.committedBy = 'TODO';
    this._package.committedOn = new Date();
    this._package.status = 'Committed';

    //TODO: call save package instead
    this.store.dispatch(PackageActions.updatePackage({package: this._package}));
  }

  onCancel() {
    this.navigate();
  }

  onItemsUpdated(updatedItems: {packedItems: ConfigItem[], unpackedItems: ConfigItem[]}) {
    this.itemsUpdated = true;
    this.packedItems = updatedItems.packedItems;
    this.unpackedItems = updatedItems.unpackedItems;
  }
  
  private navigate() {
    this.router.navigate(['../'],{relativeTo: this.route});
  }
}
