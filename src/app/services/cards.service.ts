import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Card, CreateCardDto, UpdateCardDto } from '@models/card.model';

@Injectable({
  providedIn: 'root'
})

export class CardsService {
  apiUrl = environment.API_URL

  constructor(private http: HttpClient) { }

  createCard(dto: CreateCardDto) {
    return this.http.post<Card>(`${this.apiUrl}/api/v1/cards/`,
      dto, {
      context: checkToken()
    })
  }

  updateCard(id: Card['id'], changes: UpdateCardDto):Observable<Card> {
    return this.http.put<Card>(`${this.apiUrl}/api/v1/cards/${id}`, 
      changes, 
      { context: checkToken() }
    )
  }
}
