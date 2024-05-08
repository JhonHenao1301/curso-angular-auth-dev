import { Component, OnInit } from '@angular/core';
import { faBox, faWaveSquare, faClock, faAngleUp, faAngleDown, faHeart, faBorderAll, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';
import { Board } from '@models/board.model';
import { MeService } from '@services/me.service';
import { AuthService } from '@services/auth.service';
import { CardColorComponent } from '@shared/components/card-color/card-color.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html'
})
export class BoardsComponent implements OnInit {

  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;

  boards: Board[] = []

  constructor(
    private router: Router,
    private meService: MeService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getMeBoards()
  }

  getMeBoards() {
    this.meService.getMeBoards()
    .subscribe({
      next: (data) => {
        this.boards = data
      },
      error: (error) => {
        console.log(error)
      },
    })
  }

}
