import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subject, Observable } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn$: Observable<any>;

  constructor(private authService: AuthService,
              private notificationService: NotificationService) {
                const currentUser = this.authService.currentUserValue;
                this.isLoggedIn$ = this.authService.currentUser;
              }
  
  ngOnInit() {
    this.isLoggedIn$.subscribe((data) => {
      // console.log(data)
    })
  }
  onLogout(){
    this.authService.logout();    
    this.notificationService.notify(`Logout realizado com sucesso.`);
  }
}
