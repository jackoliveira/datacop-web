import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CopListComponent } from './cop-list/cop-list.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '', component: CopListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CopRoutingModule { }
