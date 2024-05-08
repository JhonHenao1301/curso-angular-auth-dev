import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { BoardsService } from '@services/boards.service';
import { CardsService } from '@services/cards.service';
import { Board} from '@models/board.model';
import { Card, UpdateCardDto } from '@models/card.model';
import { faAdd, faClose, faFloppyDisk, faPen } from '@fortawesome/free-solid-svg-icons';
import { List } from '@models/list.model';
import { FormControl, Validators } from '@angular/forms';
import { ListsService } from '@services/lists.service';
import { BACKGROUNDS } from '@models/colors.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `  .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})

export class BoardComponent implements OnInit, OnDestroy {
  
  board$ = new BehaviorSubject<Board>({
    id: 0,
    title: "",
    backgroundColor: "green",
    creationAt: new Date(),
    updatedAt: new Date(),
    members: [
      {
        id: 0,
        name: "",
        email: "nicolas@mail.com",
        avatar: "https://api.lorem.space/image/face?w=480&h=480&r=6239",
        creationAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    lists: [
      {
        id: '0',
        title: "ToDo",
        position: 1,
        cards: []
      }
    ],
    cards: []
  })

  inputCard = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required]
  })

  inputList = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required]
  })

  inputBoard = new FormControl<string>('Board', {
    nonNullable: true,
    validators: [Validators.required]
  })
  newListFormIsOpen = false
  updateBoardInput = false
  colorBackground = BACKGROUNDS

  faClose = faClose;
  faAdd = faAdd
  faPen = faPen
  faFloppyDisk = faFloppyDisk
  
  constructor(
    private dialog: Dialog,
    private route: ActivatedRoute,
    private boardService: BoardsService,
    private cardService: CardsService,
    private listService: ListsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if(id) {
        this.getBoard(parseInt(id))
      }
    })
  }

  ngOnDestroy():void {
    this.boardService.setBackgroundColor('sky')
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    //after
    const position = this.boardService.getPositionCard(event.container.data, event.currentIndex)
    const card = event.container.data[event.currentIndex]
    const listId = event.container.id
    this.updateCard(card, { position, listId })
  }

  dropLists(event: CdkDragDrop<List[]>) {
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // } else {
    //   transferArrayItem(
    //     event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // }
    //after
    // const position = this.boardService.getPositionList(event.container.data, event.currentIndex)
    // const card = event.container.data[event.currentIndex]
    // const listId = event.container.id
    // this.updateCard(card, { position, listId })
  }

  openDialog(card: Card) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '400px',
      maxWidth: '50%',
      data: {
        card: card,
      },
    });
    dialogRef.closed.subscribe((output) => {
    });
  }

  private getBoard(id: number) {
    this.boardService.getBoards(id)
    .subscribe({
      next: (data) => {
        this.board$.next(data)
        this.boardService.setBackgroundColor(this.board$.getValue().backgroundColor)
      },
      error: () => {},
    })
  }

  updateBoard(boardId: Board['id']) {
    const title = this.inputBoard.value
    this.boardService.updateBoard(boardId, { title })
    .subscribe({
      next: (data) => {this.board$.next(data)},
      error: (error) => { console.log(error)},
      complete: () => {
        this.updateBoardInput = false
      }
    })
  }

  openFormCard(list: List) {
    if(this.board$.getValue().lists) {
      this.board$.getValue().lists = this.board$.getValue().lists.map(iteratorList => {
        if(iteratorList.id === list.id) {
          return {
            ...iteratorList,
            showCardForm: true
          }
        }
        return {
          ...iteratorList,
          showCardForm: false
        }
      })
    }
  }

  createCard(list: List) {
    const title = this.inputCard.value
    if(this.board$) {
      this.cardService.createCard({
        title,
        listId: list.id,
        boardId: this.board$.getValue().id, 
        position: this.boardService.getPositionNewItem(list.cards)
      }).subscribe({
        next: (data) => {
          list.cards.push(data)
          this.inputCard.setValue('')
          list.showCardForm = !list.showCardForm
        },
        error: (error) => console.log(error)
      })
    }
  }

  createList() {
    const title = this.inputList.value
    if(this.board$) {
      this.listService.createLIst({
        title,
        position: this.boardService.getPositionNewItem(this.board$.getValue().lists),
        boardId: this.board$.getValue().id
      }).
      subscribe({
        next: (data) => {
          this.board$.getValue().lists.push({
            ...data,
            cards: []
          })
          this.inputList.setValue('')
          this.newListFormIsOpen = !this.newListFormIsOpen
        },
        error: (error) => console.log(error),
      })
    }
  }

  get colors() {
    if(this.board$) {
      const classes = this.colorBackground[this.board$.getValue().backgroundColor]
      return classes
    }
    return {}
  }

  private updateCard(card: Card, changes: UpdateCardDto) {
    this.cardService.updateCard(card.id, changes)
    .subscribe({
      next: (data) => {console.log(data)},
      error: (error) => { console.log(error)},
    })
  }
}
