import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UserListComponent, canActivate: [AuthGuard] }
];
