import { ComponentType } from '@angular/cdk/portal';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { User } from '@model/user';
import { UserService } from '@service/user.service';
import { BehaviorSubject, combineLatest, switchMap, take } from 'rxjs';
import { GetUsersResponse } from 'src/app/core/dto/get-users-response';
import { BatchUploadUserModalComponent } from '../_component/batch-upload-user-modal/batch-upload-user-modal.component';
import { DeleteUserModalComponent } from '../_component/delete-user-modal/delete-user-modal.component';
import { EditUserModalComponent } from '../_component/edit-user-modal/edit-user-modal.component';
import { NewUserModalComponent } from '../_component/new-user-modal/new-user-modal.component';
import { EmployeeModal } from '../_type/employee-modal';


@Component({
  selector: 'employee-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit, AfterViewInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  dialogRef!: MatDialog;

  dataSource: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'login', 'salary', 'action'];
  currentPage = 0;

  order$ = new BehaviorSubject("+id");
  page$ = new BehaviorSubject(0);
  refresh$ = new BehaviorSubject(1);

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    //wait for paginator initialiated then only call api
    combineLatest([this.order$, this.page$, this.refresh$]).pipe(
      switchMap((combineParam) => {
        return this.userService.getUsers({
          minSalary: 4000,
          maxSalary: 4780,
          order: combineParam[0],
          offset: combineParam[1]
        })
      })
    ).subscribe(this.subscriptionToData());
  }

  subscriptionToData() {
    return (data: GetUsersResponse) => {
      if (data && !data.empty) {
        this.dataSource = data.content;
        this.paginator.length = data.totalElements;
        this.paginator.pageSize = 30;
      }
    }
  }

  changePage(pageNum: number) {
    this.page$.next(pageNum);
  }

  openDialog(modal: ComponentType<EmployeeModal>,
    data?: MatDialogConfig) {
    return this.dialog.open(modal, data);
  }

  createUser(): void {
    this.openDialog(NewUserModalComponent).afterClosed()
      .pipe(
        take(1)
      ).subscribe((result: string) => {
        if (result && result === "success") {
          this.refresh$.next(1);//open the first page
        }
      });
  }

  editUser(user: User) {
    this.openDialog(EditUserModalComponent, { data: user }).afterClosed()
      .pipe(
        take(1)
      ).subscribe((result: string) => {
        if (result && result === "success") {
          this.refresh$.next(1);
        }
      });
  }

  deleteUser(user: User) {
    this.openDialog(DeleteUserModalComponent, { data: user }).afterClosed()
      .pipe(
        take(1)
      ).subscribe((result: string) => {
        if (result && result === "success") {
          this.refresh$.next(1);
        }
      });
  }

  uploadUserCsv() {
    this.openDialog(BatchUploadUserModalComponent);
  }

  sortUser(sortState: Sort) {
    var order = ""; //default
    if (sortState.direction === "asc") {
      order = "+" + sortState.active;
    } else if (sortState.direction === "desc") {
      order = "-" + sortState.active;
    } else {
      order = "+id"
    }
    this.order$.next(order);
  }
}
