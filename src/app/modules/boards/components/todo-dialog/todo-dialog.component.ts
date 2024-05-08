import { Component, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import {
  faClose,
  faCheckToSlot,
  faBars,
  faUser,
  faTag,
  faCheckSquare,
  faClock,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';
import { Card } from '@models/card.model';
import { FormControl, Validators } from '@angular/forms';
import { CardsService } from '@services/cards.service';
import { BehaviorSubject } from 'rxjs';

interface InputData {
  card: Card;
}

interface OutputData {
  rta: boolean;
}

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
})

export class TodoDialogComponent {
  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;
  faFloppyDisk = faFloppyDisk

  card$ = new BehaviorSubject<Card>({
    id: '',
    title: '',
    position: 0,
    list: {
      id: '',
      title: '',
      position: 0,
      cards: []
    }
  })
  
  inputCard = new FormControl<string>(this.card$.getValue().title, {
    nonNullable: true,
    validators: [Validators.required]
  })
  openInputCard = false

  constructor(
    private cardService: CardsService,
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.card$.next(data.card);
  }

  close() {
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean) {
    this.dialogRef.close({ rta });
  }

  updateCardTitle(id: Card['id']) {
    const title = this.inputCard.value
    console.log(title)
    this.cardService.updateCard(id, { title })
    .subscribe({
      next: (data) => {this.card$.next(data)},
      error: (error) => { console.log(error)},
      complete: () => {
        this.openInputCard = false
      }
    })
  }
}
