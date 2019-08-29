import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CopRoutingModule } from './cop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CopListComponent } from './cop-list/cop-list.component';

@NgModule({
  declarations: [CopListComponent],
  imports: [
    SharedModule,
    CommonModule,
    CopRoutingModule
  ]
})
export class CopModule { }
