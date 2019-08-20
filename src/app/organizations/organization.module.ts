import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [OrganizationListComponent],
  imports: [
    SharedModule,
    CommonModule,
    OrganizationRoutingModule
  ]
})
export class OrganizationModule { }
