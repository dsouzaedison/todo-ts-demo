import React, {useState} from 'React';
import {Text} from 'react-native';
import {TodosScreenProps} from './todos.screen.props';
import {Todo} from '../../models';

export const TodosScreen: React.FunctionComponent<TodosScreenProps> = props => {
  const [todo, setTodo] = useState<Todo>(new Todo('Default todo'));

  // todo.getTitle();
  // todo.completed

  return <Text>Hello world</Text>;
};
