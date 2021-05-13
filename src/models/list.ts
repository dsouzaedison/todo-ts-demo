import _ from 'lodash';
import {action, decorate, observable} from 'mobx';

type CustomClass<T> = new (item: any) => T;

export class List<T extends {id: string}> {
  @observable readonly items: Array<T>;

  static getUniqueId = () => {
    return (
      new Date().valueOf() + Math.floor(Math.random() * 10000)
    ).toString();
  };

  constructor(rawData: any, type: CustomClass<T>) {
    this.items = [] as Array<T>;

    _.each(rawData || [], (item: any) => {
      const hasId = !!item.id;
      this.addItem(new type(hasId ? item : {id: List.getUniqueId(), ...item}));
    });
  }

  get size(): number {
    return this.items.length;
  }

  hasItems(): boolean {
    return this.size > 0;
  }

  isEmpty(): boolean {
    return !this.hasItems();
  }

  getIds(): string[] {
    return _.map(this.items, item => item.id);
  }

  getItemById(id: string): T | undefined {
    return _.find(this.items, item => item.id === id);
  }

  @action
  updateItem(updatedItem: T) {
    if (updatedItem && this.hasItems()) {
      const index = _.findIndex(this.items, item => item.id === updatedItem.id);

      if (index > -1) {
        this.items[index] = updatedItem;
      }
    }
  }

  @action
  addItem(item: T) {
    if (this.getItemById(item.id)) {
      this.updateItem(item);
    } else {
      this.items.push(item);
    }
  }

  @action
  addItems(items: Array<T>) {
    _.each(items, item => this.addItem(item));
  }

  @action
  removeItem(id: string) {
    const deleteIndex = _.findIndex(this.items, item => item.id === id);

    if (deleteIndex >= 0) {
      this.items.splice(deleteIndex, 1);
    }
  }

  @action
  clear() {
    // @ts-ignore Mobx provides clear method on an observable array
    this.items.clear();
  }

  @action
  replace(items: Array<T>) {
    // @ts-ignore Mobx provides replace method on an observable array
    this.items.replace(items);
  }

  @action
  merge(transactionList: List<T>) {
    _.each(transactionList.items, item => this.addItem(item));
  }

  /**
   * Useful for debugging list items
   * @param message Title
   */
  log(message?: string) {
    console.log(`LOGGER: ${message || ''}`, this.items.slice());
  }

  first(): T | undefined {
    return _.first(this.items);
  }

  last(): T | undefined {
    return _.last(this.items);
  }

  /**
   * Returns filtered items
   * @param iterator A function the accepts the item and returns boolean true if required
   */
  @action
  filter(iterator: (item: T) => boolean): T[] {
    return _.filter(this.items, iterator);
  }

  getFilteredList<X extends List<T>>(
    iterator: (item: T) => boolean,
    list: X,
  ): X {
    list.addItems(_.filter(this.items, iterator));
    return list;
  }

  getIndex(id: string): number {
    return _.findIndex(this.items, item => item.id === id);
  }
}
