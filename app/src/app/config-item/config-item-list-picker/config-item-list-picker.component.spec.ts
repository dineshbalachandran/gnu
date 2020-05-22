import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigItemListPickerComponent } from './config-item-list-picker.component';

describe('ConfigItemListPickerComponent', () => {
  let component: ConfigItemListPickerComponent;
  let fixture: ComponentFixture<ConfigItemListPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigItemListPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigItemListPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
