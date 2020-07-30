import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShouldLoginComponent } from './core/auth/should-login.component';
import { FallbackComponent } from './core/auth/fallback-component';


const routes: Routes = [
  {path: '', redirectTo: 'release', pathMatch: 'full'},
  {
    path: 'release',
    loadChildren: () => import('./release/release.module').then(m => m.ReleaseModule)
  },
  {path: 'should-login', component: ShouldLoginComponent},
  {path: '**', component: FallbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
