import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddRecPage } from './add-rec.page';

describe('AddRecPage', () => {
  let component: AddRecPage;
  let fixture: ComponentFixture<AddRecPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddRecPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
