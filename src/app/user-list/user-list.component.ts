import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './user-list.component.html'
})

export class UserListComponent implements OnInit {
  users: User[] = [];
  newUser: User = { name: '', email: '' };
  editUser: User | null = null;
  role: string | null = null;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    this.fetchUser();
    this.role = this.authService.getUserRole();
  }

  fetchUser() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onSubmit() {
    if (this.newUser.name && this.newUser.email) {
      this.userService.addUser(this.newUser).subscribe((addedUser) => {
        this.users.push(addedUser);
        this.newUser = { name: '', email: '' };
      });
    }
  }

  onEdit(user: User){
    this.editUser = {...user}
  }

  onUpdate(){
    if(this.editUser && this.editUser._id){
      this.userService.updateUser(this.editUser._id, this.editUser).subscribe(updated => {
        const index = this.users.findIndex(u => u._id === updated._id)
        if(index !== -1) this.users[index] = updated
        this.editUser = null
      })
      
    }
  }

  onDelete(id: String){
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(u => u._id !== id)
    })
  }
}


