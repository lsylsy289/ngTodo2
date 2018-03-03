import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import {RouterModule} from '@angular/router';
import {adminRoutes} from './admin-routing';
import {
  MatButtonModule,
  MatCardModule, MatDialog, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {AdminService} from './admin.service';
import {ViewComponent} from './news/view/view.component';
import {WriteComponent} from './news/write/write.component';
import {CKEditorModule} from 'ng2-ckeditor'
import {FormsModule} from '@angular/forms';
import { ViewDialogComponent } from './news/view-dialog/view-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(adminRoutes),
    HttpClientModule,
    FlexLayoutModule,
    CKEditorModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatDialogModule
  ],
  declarations: [AdminComponent, HomeComponent, NewsComponent, ViewComponent, WriteComponent, ViewDialogComponent],
  providers: [AdminService],
  entryComponents: [ViewDialogComponent]
})
export class AdminModule { }
