import {Routes} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {HomeComponent} from './home/home.component';
import {NewsComponent} from './news/news.component';

export const adminRoutes: Routes = [
  {path: '', component: AdminComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'news', component: NewsComponent}
    ]}
];
