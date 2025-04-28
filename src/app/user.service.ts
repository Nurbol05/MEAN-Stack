import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User{
  _id?: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: string, user: User): Observable<User>{
    return this.http.put<User>(`${this.apiUrl}/${id}`, user)
  }

  deleteUser(id: String): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
