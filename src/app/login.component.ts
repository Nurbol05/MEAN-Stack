import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(){
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        if(res && res.token)
        this.authService.saveToken(res.token)
        this.router.navigate(['/users'])
      }
    })
  }

}
