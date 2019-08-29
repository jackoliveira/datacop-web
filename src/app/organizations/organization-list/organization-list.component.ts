import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from 'src/app/shared/services/organizations.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  organizations$: Observable<any>;
  constructor(private organizationsService: OrganizationsService) { }

  ngOnInit() {
    this.organizationsService.get()
      .subscribe(({ body: { data } }) => {
        data = this.serialize(data)
        console.log(data)
      })
  }

  serialize(arr) {
    arr.forEach(el => {
      const { id, type, attributes, relationships } = el
      el = null;
      el = { id, type, ...attributes, ...relationships }
    });

    return arr
  }

  deserialize(obj: any) {
    return
  }
}
