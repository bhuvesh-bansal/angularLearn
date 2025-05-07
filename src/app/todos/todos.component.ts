import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todoo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { NgIf } from '@angular/common';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos.pipe';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgIf, TodoItemComponent, FormsModule, FilterTodosPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  private todoService = inject(TodosService);
  todoItems = signal<Array<Todoo>>([]);
  searchTerm = signal('');
  showAddTodoForm = false;
  newTodoTitle = '';
  isDeleting = false;

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodosFromApi().pipe(
      catchError((error) => {
        console.log('Error Occurred', error);
        throw error;
      })
    ).subscribe((todos) => {
      this.todoItems.set(todos);
    });
  }

  addTodo(): void {
    if (!this.newTodoTitle.trim()) return;

    const newTodo: Partial<Todoo> = {
      title: this.newTodoTitle,
      completed: false,
      userId: 1 // Using a default userId
    };

    this.todoService.createTodo(newTodo).pipe(
      catchError((error) => {
        console.log('Error creating todo', error);
        throw error;
      })
    ).subscribe((todo) => {
      this.todoItems.update(todos => [todo, ...todos]);
      this.newTodoTitle = '';
      this.showAddTodoForm = false;
    });
  }

  updateTodoItem(todoItem: Todoo): void {
    const updatedTodo = {
      ...todoItem,
      completed: !todoItem.completed
    };

    this.todoService.updateTodo(updatedTodo).pipe(
      catchError((error) => {
        console.log('Error updating todo', error);
        throw error;
      })
    ).subscribe(() => {
      this.todoItems.update((todos) => {
        return todos.map((todo) => {
          if (todo.id === todoItem.id) {
            return updatedTodo;
          }
          return todo;
        });
      });
    });
  }

  deleteTodoItem(todoItem: Todoo): void {
    this.todoService.deleteTodo(todoItem.id).pipe(
      catchError((error) => {
        console.log('Error deleting todo', error);
        throw error;
      })
    ).subscribe(() => {
      this.todoItems.update(todos => todos.filter(todo => todo.id !== todoItem.id));
    });
  }

  deleteAllTodos(): void {
    if (!confirm('Are you sure you want to delete all todos?')) return;

    const todos = this.todoItems();
    if (todos.length === 0) return;

    this.isDeleting = true;
    const todoIds = todos.map(todo => todo.id);

    this.todoService.deleteAllTodos(todoIds).pipe(
      catchError((error) => {
        console.log('Error deleting all todos', error);
        this.isDeleting = false;
        throw error;
      })
    ).subscribe(() => {
      this.todoItems.set([]);
      this.isDeleting = false;
    });
  }
}
