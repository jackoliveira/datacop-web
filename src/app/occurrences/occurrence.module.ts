import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OccurrenceRoutingModule } from './occurrence-routing.module';
import { OccurrenceListComponent } from './occurrence-list/occurrence-list.component';
import { OccurrenceListItemComponent } from './occurrence-list-item/occurrence-list-item.component';
import { SharedModule } from '../shared/shared.module';
import { OccurrenceDetailComponent } from './occurrence-detail/occurrence-detail.component';
import { OccurrenceDetailModalComponent } from './occurrence-detail-modal/occurrence-detail-modal.component';

@NgModule({
  declarations: [
    OccurrenceListComponent,
    OccurrenceListItemComponent,
    OccurrenceDetailComponent,
    OccurrenceDetailModalComponent
  ],
  imports: [
    CommonModule,
    OccurrenceRoutingModule,
    SharedModule,
  ],
  exports: [],
  entryComponents: [OccurrenceDetailModalComponent]
  
})
export class OccurrenceModule { }
