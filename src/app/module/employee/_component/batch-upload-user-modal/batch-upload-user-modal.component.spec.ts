import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchUploadUserModalComponent } from './batch-upload-user-modal.component';

describe('BatchUploadUserModalComponent', () => {
  let component: BatchUploadUserModalComponent;
  let fixture: ComponentFixture<BatchUploadUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchUploadUserModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchUploadUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
