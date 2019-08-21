import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subject, Observable } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';

interface NavLinks {
  path: string;
  name: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;                 

  constructor(private authService: AuthService,
              private notificationService: NotificationService) { }
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
  onLogout(){
    this.authService.logout();    
    this.notificationService.notify(`Logout realizado com sucesso.`);
                 
  }
}
