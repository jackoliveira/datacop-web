import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { OccurrenceDetailComponent } from './occurrence-detail/occurrence-detail.component';
import { OccurrenceListComponent } from './occurrence-list/occurrence-list.component';

const routes: Routes = [
    { path: '', component: OccurrenceListComponent, canActivate: [AuthGuard] },
    { path: ':id', component: OccurrenceDetailComponent, canActivate: [AuthGuard] }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OccurrenceRoutingModule { }
