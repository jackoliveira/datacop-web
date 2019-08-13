import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  // Access Token
  getToken(): string { return window.localStorage['access-token']; }
  saveToken(access_token: string): void { window.localStorage['access-token'] = access_token; }
  destroyToken(): void { window.localStorage.removeItem('access-token'); }
  
  // Client
  getClient(): string { return window.localStorage['client'];  }
  saveClient(client: string): void { window.localStorage['client'] = client;  }
  destroyClient() { window.localStorage.removeItem('client'); }
  
  // UID
  getUID(): string { return window.localStorage['uid'];  }
  saveUID(uid: string): void { window.localStorage['uid'] = uid;  }
  destroyUID() { window.localStorage.removeItem('uid'); }

  // Generic
  getSession(): object { return window.localStorage }
  saveSession({ access_token, client, uid }): void {
    window.localStorage['access-token'] = access_token;
    window.localStorage['client'] = client;
    window.localStorage['uid'] = uid;
  }
  destroySession() { window.localStorage.clear(); }
}
