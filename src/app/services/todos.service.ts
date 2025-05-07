import { inject, Injectable } from '@angular/core';
import { Todoo } from '../model/todo.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  getTodosFromApi(): Observable<Array<Todoo>> {
    return this.http.get<Array<Todoo>>(this.apiUrl);
  }

  createTodo(todo: Partial<Todoo>): Observable<Todoo> {
    return this.http.post<Todoo>(this.apiUrl, todo);
  }

  updateTodo(todo: Todoo): Observable<Todoo> {
    return this.http.put<Todoo>(`${this.apiUrl}/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
