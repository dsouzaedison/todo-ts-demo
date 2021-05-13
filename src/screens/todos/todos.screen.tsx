import React, {Component} from 'react';
import {Text, TextInput, View} from 'react-native';
import {TodosScreenProps} from './todos.screen.props';
import {TodosScreenState} from './todos.screen.state';
import {Todo, TodoList} from '../../models';

export class TodosScreen extends Component<TodosScreenProps, TodosScreenState> {
  constructor(props: TodosScreenProps | Readonly<TodosScreenProps>) {
    super(props);

    this.state = {
      todo: '',
      todoList: new TodoList(),
    };
  }

  render() {
    const {todo, todoList} = this.state;
    const {name} = this.props;

    return (
      <View>
        <Text>Hello {name}</Text>
        <TextInput
          placeholder="Add todo"
          onChangeText={_value => this.setState({todo: _value})}
          onSubmitEditing={e => {
            const newTodo = new Todo(e.nativeEvent.text);
            todoList.addItem(newTodo);
            this.setState({todoList, todo: ''});
          }}
          value={todo}
          style={{backgroundColor: '#fff', height: 40, paddingLeft: 10}}
        />
      </View>
    );
  }
}
