import { Component } from '@angular/core';
import { DataSourceUser } from './data-source';
import { UsersService } from '@services/users.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})

export class UsersTableComponent  {

  user$ = this.authService.user$
  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getUsers()
    // this.user$
    // .subscribe({
    //   next: (user) => {
    //     this.user = user
    //   },
    //   error: () => {},
    // })
  }

  getUsers() {
    this.usersService.getUsers()
    .subscribe({
      next: (users) => {
        this.dataSource.init(users)
      },
      error: () => {},
    })
  }

}
