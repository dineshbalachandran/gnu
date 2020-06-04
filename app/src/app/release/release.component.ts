import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as PackageActions from './package/store/package.actions';
import { unpackedPackageNo } from '../shared/model/package.model';


@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {

  navLinks = [{label: 'Package', path: ['package']}, {label: 'Migrate', path: ['migrate']}]

  constructor(private store: Store<fromApp.State>) { }

  ngOnInit(): void {
    this.store.dispatch(PackageActions.fetchPackages());
    this.store.dispatch(PackageActions.fetchConfigItems({packageNo: unpackedPackageNo}));
  }

}
