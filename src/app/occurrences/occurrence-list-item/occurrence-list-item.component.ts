import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-occurrence-list-item',
  templateUrl: './occurrence-list-item.component.html',
  styleUrls: ['./occurrence-list-item.component.scss']
})
export class OccurrenceListItemComponent implements OnInit {
  @Input() occurrence: any;
  constructor(public dialog: MatDialog) { }

  badgeSelector(type): string {
    const badge = 'badge-';
    switch (type) {
      case 'light':
        return `${badge}info`
      case 'moderate':
        return `${badge}warning`
      case 'severe':
        return `${badge}danger`
      case 'opened':
        return `${badge}primary`
      case 'closed':
        return `${badge}secondary`
      default:
        'primary';
    }

  }

  ngOnInit(): void {}

}