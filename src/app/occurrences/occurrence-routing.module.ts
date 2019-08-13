import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OccurrencesComponent } from './occurrences.component';
import { AuthGuard } from '../guards/auth.guard';
import { OccurrenceDetailComponent } from './occurrence-detail/occurrence-detail.component';
import { OccurrenceListComponent } from './occurrence-list/occurrence-list.component';

const routes: Routes = [
  { path: '', component: OccurrencesComponent, canActivate: [AuthGuard],  children: [
    { path: '', component: OccurrenceListComponent },
    { path: ':id', component: OccurrenceDetailComponent }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OccurrenceRoutingModule { }
