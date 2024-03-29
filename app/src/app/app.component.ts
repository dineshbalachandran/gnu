import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemingService } from './core/theming.service';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  themingSubscription: Subscription;

  constructor(private theming: ThemingService, private authService: AuthService) {
    this.authService.runInitialLoginSequence();
  }

  @HostBinding('class') public cssClass;

  ngOnInit() {
    this.themingSubscription = this.theming.theme.subscribe(theme => {
      this.cssClass = theme;
    });
  }

  ngOnDestroy() {
    this.themingSubscription.unsubscribe();
  }
}
