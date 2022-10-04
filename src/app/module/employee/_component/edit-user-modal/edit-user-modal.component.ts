import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@model/user';
import { EmployeeModal } from '@module/employee/_type/employee-modal';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '@service/user.service';
import { take } from 'rxjs';

@Component({
  selector: 'employee-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit, EmployeeModal {

  form!: FormGroup;
  errorMessages = '';

  constructor(
    private dialogRef: MatDialogRef<EditUserModalComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private userService: UserService) { }

  ngOnInit(): void {
    this.createForm();
    this.form.patchValue({
      id: this.user.id,
      login: this.user.login,
      name: this.user.name,
      salary: this.user.salary
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      login: ['', Validators.required],
      name: ['', Validators.required],
      salary: ['', [Validators.required]],
    });
  }

  submit() {
    this.userService.editUser(this.form.getRawValue())
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
    this.clearForm();
    this.close();
  }

  clearForm() {
    this.form.patchValue({});
    this.createForm();
  }

  close(result?: string) {
    this.dialogRef.close(result);
  }
}
