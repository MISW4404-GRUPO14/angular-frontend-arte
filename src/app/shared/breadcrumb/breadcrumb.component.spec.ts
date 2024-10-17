import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbComponent } from './breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    component.breadcrumbItems = [
      { label: 'Home', link: '/' },
      { label: 'Page', link: '/page' },
      { label: 'Subpage' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct breadcrumb items', () => {
    const breadcrumbItems =
      fixture.nativeElement.querySelectorAll('.breadcrumb-item');
    expect(breadcrumbItems.length).toEqual(3);
    expect(breadcrumbItems[0].textContent.trim()).toEqual('Home');
    expect(breadcrumbItems[1].textContent.trim()).toEqual('Page');
    expect(breadcrumbItems[2].textContent.trim()).toEqual('Subpage');
  });

  it('should apply the "active" class to the last breadcrumb item', () => {
    const breadcrumbItems =
      fixture.nativeElement.querySelectorAll('.breadcrumb-item');
    expect(breadcrumbItems[2].classList.contains('active')).toBeTrue();
  });
});
