import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IBaseUser, IUser, IUserCredentials } from '../../shared/models/iuser';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(userCredentials: IUserCredentials): Observable<IBaseUser> {
    const apiUrl = environment.apiUrl + '/auth/login';
    return this.httpClient.post<IBaseUser>(apiUrl, userCredentials);
  }

  getCurrentUser(): Observable<IUser> {
    const apiUrl = environment.apiUrl + '/auth/me';
    return this.httpClient.get<IUser>(apiUrl);
  }
}
