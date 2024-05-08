import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown,
  faUserGroup
} from '@fortawesome/free-solid-svg-icons';
import { BoardsService } from '@services/boards.service';
import { Colors, NAV_BACKGROUNDS } from '@models/colors.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})

export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;
  faUserGroup = faUserGroup

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  isOpenOverlayCreate = false;

  user$ = this.authService.user$
  navBackgroundColor: Colors = 'sky'
  navColors = NAV_BACKGROUNDS

  constructor(
    private authService: AuthService,
    private boardService: BoardsService,
    private router: Router
  ) {
    this.boardService.backgroundColor$
    .subscribe(color => {
        this.navBackgroundColor = color
    })
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  close($event: boolean) {
    this.isOpenOverlayCreate = $event
  }

  get colors() {
    const classes = this.navColors[this.navBackgroundColor]
    return classes
  }

  createWorkspace() {}
}
