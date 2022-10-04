import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@model/user';
import { EmployeeModal } from '@module/employee/_type/employee-modal';
import { UserService } from '@service/user.service';
import { take } from 'rxjs';

@Component({
  selector: 'employee-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss']
})
export class DeleteUserModalComponent implements OnInit, EmployeeModal {

  errorMessages = '';

  constructor(
    private dialogRef: MatDialogRef<DeleteUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.userService.deleteUser(this.user.id as string)
      .pipe(take(1)).subscribe({
        next: _ => {
          this.close("success");
        },
        error: (err) => {
          this.errorMessages = err['message'];
        }
      })
  }

  cancel() {
    this.close();
  }

  close(result?: string) {
    this.dialogRef.close(result);
  }
}
