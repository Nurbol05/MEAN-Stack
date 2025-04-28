import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, User } from './user.service';

describe('UserService CRUD with Role', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve users (GET)', () => {
    const allUsers: User[] = [
      { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' },
      { _id: '2', name: 'Jane Doe', email: 'jane@example.com', role: 'admin' }
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(allUsers);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(allUsers);
  });

  it('should add a user (POST)', () => {
    const newUser: User = { name: 'New User', email: 'newuser@example.com', role: 'user' };
    const createdUser: User = { _id: '123', ...newUser };

    service.addUser(newUser).subscribe(user => {
      expect(user).toEqual(createdUser);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(createdUser);
  });

  it('should update a user (PUT)', () => {
    const updatedUser: User = { _id: '123', name: 'Updated User', email: 'updated@example.com', role: 'admin' };

    service.updateUser('123', updatedUser).subscribe(user => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/users/123');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUser);
    req.flush(updatedUser);
  });

  it('should delete a user (DELETE)', () => {
    service.deleteUser('123').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/api/users/123');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

});
