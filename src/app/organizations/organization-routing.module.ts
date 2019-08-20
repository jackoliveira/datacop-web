import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '', component: OrganizationListComponent, canActivate: [AuthGuard] },
  { path: ':id', component: OrganizationListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
