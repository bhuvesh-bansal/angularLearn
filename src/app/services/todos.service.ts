import { inject, Injectable } from '@angular/core';
import { Todoo } from '../model/todo.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  http = inject(HttpClient);
  getTodosFromApi() {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    return this.http.get<Array<Todoo>>(url);
  }
}
