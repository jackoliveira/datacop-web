import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/occurrences', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
  { path: 'cops', loadChildren: './cops/cop.module#CopModule' },
  { path: 'occurrences', loadChildren: './occurrences/occurrence.module#OccurrenceModule' },
  { path: 'organizations', loadChildren: './organizations/organization.module#OrganizationModule' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
