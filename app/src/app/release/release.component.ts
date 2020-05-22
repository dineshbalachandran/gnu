import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {

  navLinks = [{label: 'Package', path: ['package']}, {label: 'Migrate', path: ['migrate']}]

  constructor() { }

  ngOnInit(): void {
  }

}
