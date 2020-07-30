import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavService } from './sidenav/sidenav.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ThemingService } from './theming.service';
import { OAuthModule, OAuthStorage, AuthConfig, OAuthModuleConfig } from 'angular-oauth2-oidc';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShouldLoginComponent } from './auth/should-login.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { authConfig } from './auth/auth-config';
import { authModuleConfig } from './auth/auth-module-config';
import { FallbackComponent } from './auth/fallback-component';

// We need a factory since localStorage is not available at AOT build time
export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    OAuthModule.forRoot()
  ],
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    ShouldLoginComponent,
    FallbackComponent
  ],
  exports: [
    SidenavComponent,
    ToolbarComponent,
    ShouldLoginComponent,
    FallbackComponent
  ],
  providers: [
    SidenavService,
    ThemingService,
    AuthService,
    AuthGuard
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: AuthConfig, useValue: authConfig },
        { provide: OAuthModuleConfig, useValue: authModuleConfig },
        { provide: OAuthStorage, useFactory: storageFactory },
      ]
    };
  }

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
 }
