import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexPageComponent } from './index-page/index-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NewUserModalComponent } from './_component/new-user-modal/new-user-modal.component';
import { EditUserModalComponent } from './_component/edit-user-modal/edit-user-modal.component';
import { BatchUploadUserModalComponent } from './_component/batch-upload-user-modal/batch-upload-user-modal.component';
import { DeleteUserModalComponent } from './_component/delete-user-modal/delete-user-modal.component';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    IndexPageComponent,
    NewUserModalComponent,
    EditUserModalComponent,
    BatchUploadUserModalComponent,
    DeleteUserModalComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule
  ]
})
export class EmployeeModule { }
