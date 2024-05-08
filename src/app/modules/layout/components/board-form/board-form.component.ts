import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Colors } from '@models/colors.model';
import { BoardsService } from '@services/boards.service';
import { faPen, faEye, faCheck, faHands } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html'
})

export class BoardFormComponent {

  @Output() closeOverlay = new EventEmitter<boolean>()
 
  form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    backgroundColor: new FormControl<Colors>('sky', {
      nonNullable: true,
      validators: [ Validators.required ]
    })
  })

  titleValidator = false

  faPen = faPen;
  faEye = faEye;
  faCheck = faCheck;
  faHands = faHands

  constructor(
    private formBuilder: FormBuilder,
    private boardService: BoardsService,
    private router: Router
  ){}

  doSave() {
    if(this.form.valid) {
      const { title, backgroundColor } = this.form.getRawValue()
      this.boardService.createBoard(title, backgroundColor)
      .subscribe({
        next: (board) => {
          this.closeOverlay.next(false)
          this.router.navigate(['/app/boards', board.id])
        },
        error: (error) => { console.log(error) },
      })
    } else {
      this.form.markAllAsTouched()
      const { title } = this.form.getRawValue()
      !title ? this.titleValidator = false : this.titleValidator = true
      console.log(this.titleValidator)
    }
  }

}
