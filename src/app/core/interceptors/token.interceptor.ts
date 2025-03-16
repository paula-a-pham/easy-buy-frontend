import { HttpInterceptorFn } from '@angular/common/http';
import { IBaseUser } from '../../shared/models/iuser';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userString = localStorage.getItem('user');
  if (userString) {
    try {
      const user: IBaseUser = JSON.parse(userString);
      const token = 'Bearer ' + user.accessToken;
      const clonedReq = req.clone({ setHeaders: { Authorization: token } });
      return next(clonedReq);
    } catch (error) {
      console.error(`Can't parse user data: `, error);
    }
  }
  return next(req);
};
