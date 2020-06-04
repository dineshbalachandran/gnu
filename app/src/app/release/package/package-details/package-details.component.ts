import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Package, unpackedPackageNo, isPackageMutable } from '../../../shared/model/package.model';
import * as fromApp from '../../../store/app.reducer';
import * as PackageActions from '../store/package.actions';
import { ConfigItem } from '../../../shared/model/config-item.model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss']
})
export class PackageDetailsComponent implements OnInit, OnDestroy {
  
  isLoading = true;
  packageForm: FormGroup;
  
  private storeSub: Subscription;  

  itemsUpdated = false;
  packageNo: string;
  
  _package: Package;
  packedItems: ConfigItem[] = [];
  unpackedItems: ConfigItem[] = [];
  isMutable = false;

  constructor(private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router,    
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
    this.store.dispatch(PackageActions.fetchConfigItems({packageNo: this.packageNo}));    

    this.storeSub = this.store.select('package').pipe(
      map(packageState => ({
        package : packageState.packages.find((_package, i) => this.packageNo === _package.no),
        packedItems: packageState.configItems.get(this.packageNo),
        unpackedItems: packageState.configItems.get(unpackedPackageNo)
      }))
    ).subscribe(data => {
      console.log(data);
      if (isNullOrUndefined(data.package) || isNullOrUndefined(data.packedItems) ||  isNullOrUndefined(data.unpackedItems))
        return;
      this._package = {...data.package};
      this.packedItems = [...data.packedItems];
      this.unpackedItems = [...data.unpackedItems];

      this.isMutable = isPackageMutable(this._package);

      console.log(this._package);     

      let committedOn = this._package.committedOn ? this._package.committedOn : '';

      this.packageForm = this.fb.group({
        createdBy: [{value: this._package.createdBy, disabled: true}],
        status: [{value: this._package.status, disabled: true}],
        source: [{value: this._package.source, disabled: true}],
        committedBy: [{value: this._package.committedBy, disabled: true}],
        committedOn: [{value: committedOn, disabled: true}],
        description: [{value: this._package.description, disabled: !this.isMutable}, Validators.required],
      });

      this.isLoading = false;
    });    
  }

  onSubmit() {
    let _package : Package = this.packageForm.value;
    this._package.description = _package.description;    

    this.store.dispatch(PackageActions.savePackage({package: this._package}));
    if (this.itemsUpdated) {
      this.store.dispatch(PackageActions.saveRepackedPackage({packageNo: this._package.no, configItems: this.packedItems}));
    }

    alert('Thanks!');
    this.navigate();
  }

  onCommit() {    
    this._package.committedBy = 'TODO';
    this._package.committedOn = new Date();
    this._package.status = 'Committed';
   
    this.store.dispatch(PackageActions.savePackage({package: this._package}));
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
