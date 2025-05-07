import { Component, input, output } from '@angular/core';
import { Todoo } from '../../model/todo.type';
import { HighlightCompletedTodoDirective } from '../../directives/highlight-completed-todo.directive';

@Component({
  selector: 'app-todo-item',
  imports: [HighlightCompletedTodoDirective],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  todo = input.required<Todoo>();
  todoToggled = output<Todoo>();

  todoClicked() {
    this.todoToggled.emit(this.todo());
  }
}
