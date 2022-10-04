import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeModal } from '@module/employee/_type/employee-modal';
import { UserService } from '@service/user.service';
import { take } from 'rxjs';

@Component({
  selector: 'employee-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.scss']
})
export class NewUserModalComponent implements OnInit, EmployeeModal {

  form!: FormGroup;
  errorMessages = '';

  constructor(private dialogRef: MatDialogRef<NewUserModalComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void {
    this.createForm();
    this.errorMessages = '';
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      login: ['', Validators.required],
      name: ['', Validators.required],
      salary: ['', [Validators.required]],
    });
  }

  submit() {
    this.userService.createUser(this.form.getRawValue())
      .pipe(take(1)).subscribe({
        next: _ => {
          this.close("success");
        },
        error: (err) => {
          if (Array.isArray(err['error']['mesaage'])) {
            for (var i = 0; i < err['error']['mesaage'].length; i++) {
              var message = err['error']['mesaage'][i]
              this.errorMessages += message['Rejected value : '] + ' '
                + message['Error Message : '] + '\n';
            }
          } else {
            this.errorMessages = err['error']['message'];
          }
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
