enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export class Todo {
  id: string;
  readonly title: string;
  /**
   * @deprecated
   */
  completed: boolean;
  priority: Priority;

  constructor(title: any) {
    this.id = new Date().valueOf().toString();
    this.title = title ?? '';
    this.completed = false;
    this.priority = Priority.LOW;
  }

  /**
   * Returns a todo
   * @deprecated Dont use this method. Reason: ...
   */
  getTitle(index?: number): string {
    return (index ?? this.id) + this.title;
  }

  changePriority(priority: Priority): void {
    this.priority = priority;
  }

  getIdByType<T extends string | number>(isNumeric: boolean) {
    return isNumeric ? Number(this.id) : this.id;
  }
}

// const todo = new Todo('Test')
// // Valid
// todo.getIdByType<number>(true)
// // Invalid
// todo.getIdByType<boolean>(true)
