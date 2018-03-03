import {Routes} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {HomeComponent} from './home/home.component';
import {NewsComponent} from './news/news.component';
import {ViewComponent} from './news/view/view.component';
import {WriteComponent} from './news/write/write.component';

export const adminRoutes: Routes = [
  {path: '', component: AdminComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'news', component: NewsComponent, children: [
      {path: 'view/:news_id', component: ViewComponent},
      {path: 'write', component: WriteComponent}
    ]}
  ]}
];
