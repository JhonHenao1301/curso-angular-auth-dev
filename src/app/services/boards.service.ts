import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Board, UpdateBoardDto } from '@models/board.model';
import { checkToken } from '@interceptors/token.interceptor';
import { Card } from '@models/card.model';
import { Colors } from '@models/colors.model';
import { List } from '@models/list.model';
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  apiUrl = environment.API_URL
  bufferSpace = 65535
  backgroundColor$ = new BehaviorSubject<Colors>('sky')

  constructor(
    private http: HttpClient
  ) { }

  getBoards(id: Board['id']) {
    return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`,  {  context: checkToken()  })
  }

  createBoard(title: string, backgroundColor: Colors) {
    return this.http.post<Board>(`${this.apiUrl}/api/v1/boards`, {
      title,
      backgroundColor
    },
    { context: checkToken() })
  }

  updateBoard(id: Board['id'], changes: UpdateBoardDto):Observable<Board> {
    return this.http.put<Board>(`${this.apiUrl}/api/v1/boards/${id}`, changes,
    { context: checkToken() })
  }

  getPositionCard(cards: Card[], currentIndex: number) {
    if(cards.length === 1) {
      return this.bufferSpace
    }

    if (cards.length > 1 && currentIndex === 0) {
      const onTopPosition = cards[1].position
      return onTopPosition / 2
    }
      
    const lastIndex = cards.length - 1
    if(cards.length > 1 && currentIndex < lastIndex) {
      const prevPosition = cards[currentIndex - 1].position
      const nextPosition = cards[currentIndex + 1].position
      return (prevPosition + nextPosition) / 2
    }
    
    if(cards.length > 1 && currentIndex === lastIndex) {
      const onBottomPosition = cards[lastIndex - 1].position
      return onBottomPosition + this.bufferSpace
    }
    return 0
  }

  getPositionNewItem(elements: Card[] | List[]) {
    if(elements.length === 0) {
      return this.bufferSpace
    }

    const lastIndex = elements.length - 1
    const onBottomPosition = elements[lastIndex].position
    return onBottomPosition + this.bufferSpace
  }

  setBackgroundColor(color: Colors) {
    this.backgroundColor$.next(color)
  }
}
