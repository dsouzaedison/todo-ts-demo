import {TodoList} from '../../models';

export interface TodosScreenState {
  /**
   * User input
   */
  todo: string;

  /**
   * List of todos
   */
  todoList: TodoList;
}
