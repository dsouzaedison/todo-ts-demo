import {List} from '../list';
import {Todo} from './todo.model';

export class TodoList extends List<Todo> {
  constructor(rawData?: any[]) {
    super(rawData, Todo);
  }
}
