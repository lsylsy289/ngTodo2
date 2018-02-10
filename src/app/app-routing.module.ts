import {Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {JqueryComponent} from './jquery/jquery.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  {path: '', component: IndexComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'jquery', component: JqueryComponent}
  ]}
];
