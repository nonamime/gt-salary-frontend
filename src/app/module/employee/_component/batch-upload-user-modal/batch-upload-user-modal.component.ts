import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeeModal } from '@module/employee/_type/employee-modal';
import { UserService } from '@service/user.service';

@Component({
  selector: 'employee-batch-upload-user-modal',
  templateUrl: './batch-upload-user-modal.component.html',
  styleUrls: ['./batch-upload-user-modal.component.scss']
})
export class BatchUploadUserModalComponent implements OnInit, EmployeeModal {

  fileAttr: string = "";
  progressInfos: string[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }


  //TODO to finish, upload file list feature
  // upload(file) {
  //   this.userService.uploadUserCsv(file).subscribe(
  //     event => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
  //       } else if (event instanceof HttpResponse) {
  //         this.fileInfos = this.uploadService.getFiles();
  //       }
  //     },
  //     err => {
  //       this.progressInfos[idx].value = 0;
  //       this.message = 'Could not upload the file:' + file.name;
  //     });
  // }


  
}
