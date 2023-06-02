import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListRecPage } from './list-rec.page';

describe('ListRecPage', () => {
  let component: ListRecPage;
  let fixture: ComponentFixture<ListRecPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListRecPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
