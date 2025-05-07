import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Todoo } from '../../model/todo.type';
import { HighlightCompletedTodoDirective } from '../../directives/highlight-completed-todo.directive';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [HighlightCompletedTodoDirective, UpperCasePipe],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  private _todoSignal = signal<Todoo>({} as Todoo);
  
  @Input({ required: true }) set todo(value: Todoo) {
    this._todoSignal.set(value);
  }
  
  get todoSignal() {
    return this._todoSignal.asReadonly();
  }

  @Output() todoToggled = new EventEmitter<Todoo>();
  @Output() todoDeleted = new EventEmitter<Todoo>();

  todoClicked() {
    this.todoToggled.emit(this._todoSignal());
  }

  deleteTodo() {
    this.todoDeleted.emit(this._todoSignal());
  }
}
