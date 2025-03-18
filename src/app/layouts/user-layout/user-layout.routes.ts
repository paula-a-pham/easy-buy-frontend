import { Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout.component';

export const userLayoutRoutes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../features/landing/landing.routes').then(
            (m) => m.landingRoutes
          ),
      },
    ],
  },
];
