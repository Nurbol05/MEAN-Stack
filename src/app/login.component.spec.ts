import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'saveToken']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('login and navigate', () => {
    const fakeToken = {token: 'test123'}
    authServiceSpy.login.and.returnValue(of(fakeToken))

    component.email = 'test@gmail.com';
    component.password = 'pass123';
    component.onLogin();

    expect(authServiceSpy.login).toHaveBeenCalledWith('test@gmail.com', 'pass123')
    expect(authServiceSpy.saveToken).toHaveBeenCalledWith('test123');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/users'])
  })

});
