import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { WelcomeMockService } from './services/welcome-mock.service';

describe('AppComponent', () => {
  let welcomeMock: jasmine.SpyObj<WelcomeMockService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj<WelcomeMockService>('WelcomeMockService', [
      'getWelcomeMessage',
      'updateWelcomeMessage'
    ]);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: WelcomeMockService, useValue: spy }]
    }).compileComponents();

    welcomeMock = TestBed.inject(WelcomeMockService) as jasmine.SpyObj<WelcomeMockService>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the hero title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('DevContainer Angular para APIs mockeadas');
  });

  it('should display mock GET response when the fetch action is triggered', () => {
    welcomeMock.getWelcomeMessage.and.returnValue(
      of({ message: 'Hola desde el test', description: 'Mock GET' })
    );
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.triggerMock('fetch');

    expect(welcomeMock.getWelcomeMessage).toHaveBeenCalled();
    expect(component.responseText).toContain('Hola desde el test');
    expect(component.responseTitle).toContain('GET');
    expect(component.lastAction).toBe('fetch');
  });

  it('should display mock POST response when the update action is triggered', () => {
    welcomeMock.updateWelcomeMessage.and.returnValue(
      of({ message: 'Nuevo mensaje', description: 'Mock POST' })
    );
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.triggerMock('update');

    expect(welcomeMock.updateWelcomeMessage).toHaveBeenCalled();
    expect(component.responseText).toContain('Nuevo mensaje');
    expect(component.responseTitle).toContain('POST');
    expect(component.lastAction).toBe('update');
  });
});
